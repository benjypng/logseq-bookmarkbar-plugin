import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'instructions',
    title: 'Instructions',
    type: 'heading',
    description: 'Reload the plugin when new bookmarks are inserted',
    default: '',
  },
  {
    key: 'noOfBookmarks',
    title: 'Number of Bookmarks',
    type: 'number',
    description: 'Reload when changing this number',
    default: 3,
  },
]
