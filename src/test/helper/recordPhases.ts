import { WheelAnalyzer } from '../../wheel-analyzer/wheel-analyzer'
import { PhaseData, SubscribeFn, WheelEventData, WheelTypes } from '../../wheel-analyzer/wheel-analyzer-types'

interface SubAndFeedProps {
  beforeFeed?: (e: WheelEventData, i: number) => void
  callback?: SubscribeFn
  wheelEvents?: WheelEventData[]
}

export function subscribeAndFeedWheelEvents({ beforeFeed, callback, wheelEvents = [] }: SubAndFeedProps = {}) {
  const allPhaseData: PhaseData[] = []

  // need to use fake timers, so we can run the debounced end function after feeding all events
  jest.useFakeTimers()

  const wheelAnalyzer = WheelAnalyzer({ reverseSign: false })

  callback && wheelAnalyzer.subscribe(callback)
  wheelAnalyzer.subscribe((_, data) => allPhaseData.push(data))

  let prevTimeStamp = 0

  function feedEvents(eventsToFeed: WheelEventData[]) {
    eventsToFeed.forEach((e, i) => {
      // move time forward (triggers eg. timeouts with end continues gesture)
      if (prevTimeStamp) {
        jest.advanceTimersByTime(e.timeStamp - prevTimeStamp)
      }

      beforeFeed && beforeFeed(e, i)
      wheelAnalyzer.feedWheel(e)

      prevTimeStamp = e.timeStamp
    })

    // fast forward and exhaust currently pending timers, this will trigger the *_END events
    jest.runOnlyPendingTimers()
  }

  feedEvents(wheelEvents)

  return { wheelAnalyzer, allPhaseData, feedEvents }
}

export type Range = [number, number]

export interface PhaseRange {
  wheelType: WheelTypes
  range: Range
  canceled?: boolean
  lastData?: PhaseData
}

export function recordPhases(wheelEvents: WheelEventData[]) {
  const phases: PhaseRange[] = []
  const phaseRange: Record<WheelTypes, Range> = {
    WHEEL: [-1, -1],
    MOMENTUM_WHEEL: [-1, -1],
    ANY_WHEEL: [-1, -1],
  }
  let eventIndex = -1

  // record phases
  subscribeAndFeedWheelEvents({
    // update index which is used to keep track of the ranges
    beforeFeed: (_, i) => (eventIndex = i),
    callback: (type, data) => {
      const isStart = type.endsWith('_START')
      const isEnd = type.endsWith('_END')
      const isCancel = type.endsWith('_CANCEL')
      const wheelType = type
        .replace('_START', '')
        .replace('_END', '')
        .replace('_CANCEL', '') as WheelTypes

      if (wheelType === 'ANY_WHEEL') return

      // keep track of start and end indices for each phase
      if (isStart) {
        phaseRange[wheelType][0] = eventIndex
      } else if (isEnd || isCancel) {
        phaseRange[wheelType][1] = eventIndex

        // check if phase has a valid start index, if save the phase
        if (phaseRange[wheelType][0] >= 0) {
          phases.push({
            wheelType,
            range: phaseRange[wheelType],
            ...(isCancel ? { canceled: isCancel } : null),
            lastData: data,
          })
        }

        // end & reset phase
        phaseRange[wheelType] = [-1, -1]
      }
    },
    wheelEvents,
  })

  return { phases }
}
