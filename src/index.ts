import '@logseq/libs'

import css from './index.css?raw'
import { settings } from './settings'

let noOfBookmarks
console.log(noOfBookmarks)

for (let i = 0; i < noOfBookmarks; i++) {
  settings.push({
    key: `bookmark-${i + 1}`,
    type: 'string',
    description: 'Enter page name.',
    default: '',
    title: `Bookmark ${i + 1}`,
  })
}

const main = async () => {
  console.log('logseq-boomarkbar-plugin loaded')
  logseq.provideStyle(css)
  noOfBookmarks = logseq.settings!.noOfBookmarks
  console.log(logseq.settings)

  for (let i = 0; i < 4; i++) {
    logseq.provideModel({
      [`goToBookmark${i + 1}`]: () => {
        logseq.App.pushState('page', {
          name: logseq.settings![`bookmark-${i + 1}`],
        })
      },
    })

    logseq.App.registerUIItem('toolbar', {
      key: `logseq-bookmark${i + 1}-plugin`,
      template: `
<a id="${logseq.settings![`bookmark-${i + 1}`]}" data-on-click="goToBookmark${i + 1}" class="button bookmark-btn">
    ${logseq.settings![`bookmark-${i + 1}`]}
  <span class="bookmark-indicator">3</span>
</a>`,
    })

    setTimeout(() => {
      const el = parent.document.getElementById(
        `${logseq.settings![`bookmark-${i + 1}`]}`,
      )!
      if (!el) return
      el.addEventListener('contextmenu', async () => {
        const page = await logseq.Editor.getPage(
          `${logseq.settings![`bookmark-${i + 1}`]}`,
        )
        if (!page) return
        logseq.Editor.openInRightSidebar(page.uuid)
      })
    }, 200)
  }
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
