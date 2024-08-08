import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin'

export const handleSettings = (settings: SettingSchemaDesc[]) => {
  logseq.useSettingsSchema(settings)
}
