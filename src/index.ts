import '@logseq/libs'

import { settings } from './settings'

const main = async () => {
  console.log('logseq-boomarkbar-plugin loaded')

  const noOfBookmarks = logseq.settings!.noOfBookmarks as number

  for (let i = 0; i < noOfBookmarks; i++) {
    settings.push({
      key: `bookmark-${i + 1}`,
      type: 'string',
      description: 'Enter page name.',
      default: '',
      title: `Bookmark ${i + 1}`,
    })
  }

  for (let i = 0; i < noOfBookmarks; i++) {
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
<a id="${logseq.settings![`bookmark-${i + 1}`]}" data-on-click="goToBookmark${i + 1}" class="button" style="margin:0 5px;max-height:30px;font-size: 10px;border: 1px solid black;cursor: pointer !important;">
    ${logseq.settings![`bookmark-${i + 1}`]}
</a>`,
    })

    setTimeout(() => {
      parent.document
        .getElementById(`${logseq.settings![`bookmark-${i + 1}`]}`)!
        .addEventListener('contextmenu', async () => {
          const page = await logseq.Editor.getPage(
            `${logseq.settings![`bookmark-${i + 1}`]}`,
          )
          if (!page) return
          logseq.Editor.openInRightSidebar(page.uuid)
        })
    }, 100)
  }
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
