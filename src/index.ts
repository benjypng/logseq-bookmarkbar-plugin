import "@logseq/libs";
import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";

// Change this where needed
let noOfBookmarks: number = 3;

let settings: SettingSchemaDesc[] = [
  {
    key: "instructions",
    title: "Instructions",
    type: "heading",
    description: "Reload the plugin when new bookmarks are inserted",
    default: "",
  },
];

for (let i = 0; i < noOfBookmarks; i++) {
  settings.push({
    key: `bookmark-${i + 1}`,
    type: "string",
    description: "",
    default: "",
    title: `Bookmark ${i + 1}`,
  });
}

const main = async () => {
  console.log("logseq-boomarkbar-plugin loaded");

  for (let i = 0; i < noOfBookmarks; i++) {
    logseq.provideModel({
      [`goToBookmark${i + 1}`]: () => {
        logseq.App.pushState("page", {
          name: logseq.settings![`bookmark-${i + 1}`],
        });
      },
    });
    logseq.App.registerUIItem("toolbar", {
      key: `logseq-bookmark${i + 1}-plugin`,
      template: `
<a data-on-click="goToBookmark${i + 1}" class="button" style="margin: 5px; font-size: 12px; border: 1px solid black; padding: 1px 10px; cursor: pointer !important;">
    ${logseq.settings![`bookmark-${i + 1}`]}
</a>`,
    });
  }
};

logseq.useSettingsSchema(settings).ready(main).catch(console.error);
