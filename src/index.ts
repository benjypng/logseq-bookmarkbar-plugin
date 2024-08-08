import '@logseq/libs'

import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'

import { getNumberofLinkedReferences } from './get-linked-ref-number'
import { handleSettings } from './handle-settings'
import css from './index.css?raw'

const settings: SettingSchemaDesc[] = [
  {
    key: 'noOfBookmarks',
    title: 'Number of Bookmarks',
    description:
      'Restart Logseq when changing this setting, even during the first time.',
    type: 'number',
    default: 1,
  },
  {
    key: 'indicateUnread',
    title: 'Indicate Unread',
    description:
      'If checked, there will be an indication if the page has at least 1 linked reference.',
    type: 'boolean',
    default: true,
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

  const renderToolbar = async (pageName: string, i: number) => {
    logseq.App.registerUIItem('toolbar', {
      key: pageName,
      template: `
<a id="${pageName}" data-on-click="goToBookmark${i + 1}" class="button bookmark-btn">
    ${pageName}${await getNumberofLinkedReferences(pageName)}
</a>`,
    })
  }

  for (let i = 0; i < 4; i++) {
    const pageName = logseq.settings![`bookmark-${i + 1}`] as string

    logseq.provideModel({
      [`goToBookmark${i + 1}`]: () => {
        renderToolbar(pageName, i)
        logseq.App.pushState('page', {
          name: pageName,
        })
      },
    })

    renderToolbar(pageName, i)
  }
}

logseq.ready(main).catch(console.error)
