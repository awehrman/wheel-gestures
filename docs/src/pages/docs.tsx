import React from 'react'

import CodeArea from '../components/CodeArea/CodeArea'
import Skeleton from '../components/Layout/Skeleton'
import { Richtext } from '../components/Richtext/Richtext'
import SEO from '../components/seo'
import { simpleListener } from './docs/docs-codes'

export default function Docs() {
  return (
    <Skeleton>
      <SEO title="Docs" />
      <Richtext>
        <h1>Docs</h1>

        <h3>Installation</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium adipisci, debitis enim est
          facere illo ipsa maiores mollitia neque nisi non nostrum placeat possimus recusandae, sequi soluta, sunt vero!{' '}
        </p>
        <CodeArea>yarn add wheel-gestures</CodeArea>
        <ul>
          <li>lorem lorem ipsum dolor</li>
          <li>lorem lorem ipsum dolor</li>
          <li>lorem lorem ipsum dolor</li>
        </ul>
        <h3>Getting started</h3>
        <CodeArea>{simpleListener}</CodeArea>
        <h3>momentum detection - Compatibility</h3>
        <table>
          <thead>
            <tr>
              <th />
              <th>Firefox</th>
              <th>Chromium (Edge, Chrome etc.)</th>
              <th>Safari</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                macOS +
                <br />
                Magic Mouse & Magic Trackpad
              </th>
              <td>
                <span role="img" aria-label="tested">
                  ✅
                </span>
              </td>
              <td>
                <span role="img" aria-label="tested">
                  ✅
                </span>
              </td>
              <td>
                <span role="img" aria-label="tested">
                  ✅
                </span>
              </td>
            </tr>
            <tr>
              <th>
                Windows 10 +
                <br />
                Precision Touchpads (PTP)
              </th>
              <td>
                <span role="img" aria-label="tested">
                  ✅
                </span>
              </td>
              <td>
                <span role="img" aria-label="tested">
                  ✅
                </span>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        <h3>Example</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus beatae debitis dicta dolor fuga labore
          necessitatibus, nemo nesciunt nihil odio perspiciatis, quasi qui quia repudiandae tempore unde ut vitae
          voluptatem!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias debitis deserunt eius enim error fugit labore,
          maiores, necessitatibus nisi numquam optio placeat praesentium quaerat quia quibusdam suscipit vero voluptas
          voluptates!
        </p>
      </Richtext>
    </Skeleton>
  )
}
