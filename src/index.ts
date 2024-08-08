import '@logseq/libs'

import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'

import css from './index.css?raw'
import { handleSettings } from './handle-settings'

const settings: SettingSchemaDesc[] = [
  {
    key: 'noOfBookmarks',
    title: 'Number of Bookmarks',
    type: 'number',
    description:
      'Restart Logseq when changing this setting, even during the first time.',
    default: 1,
  },
]

const main = async () => {
  console.log('logseq-boomarkbar-plugin loaded')

  for (let i = 0; i < (logseq.settings!.noOfBookmarks as number); i++) {
    settings.push({
      key: `bookmark-${i + 1}`,
      title: `Bookmark ${i + 1}`,
      description: `Indicate the page name`,
      type: 'string',
      default: '',
    })
  }

  handleSettings(settings)
  logseq.provideStyle(css)

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

logseq.ready(main).catch(console.error)
