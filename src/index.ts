import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { getByProps, getModule } from 'enmity/metro';
import { create } from 'enmity/patcher';
const MessageStore = getByProps("getMessage", "getMessages");
import manifest from "./manifest.json";
const SelectedChannelStore = getByProps("getLastSelectedChannelId");
const DispatcherModule = getModule((e) => e.dispatch && !e.getCurrentUser);
const ChannelStore = getByProps("getChannel", "getDMFromUserId");
import { makeStore } from 'enmity/api/settings';

const Patcher = create('lowercase-messages');

const LowercaseMessages: Plugin = {
   ...manifest,
   patches: [],

   onStart() {
      const Settings = makeStore(this.name);

      Patcher.before(DispatcherModule, "dispatch", (a0, event, a2) => {
         // Message update event, lowercase the message
         if (
            event[0].type === "MESSAGE_UPDATE" &&
            event[0].message.content !== undefined
         ) {
            const selectedGuild = ChannelStore.getChannel(
               SelectedChannelStore.getChannelId()
            ).guild_id;
            if (event[0].message.guild_id !== selectedGuild) return;
            if (event[0].message.author.id === "721692862521278515") {
               const originalMessage = MessageStore.getMessage(
                  event[0].message.channel_id,
                  event[0].message.id
               );
               if (event[0].message.content.slice(-1) === '.') {
                  event[0].message.content = event[0].message.content.toLowerCase().replace(/.$/,"");
               }
               event[0].message.content = event[0].message.content.toLowerCase();
            }
            return;
         }

         // Message create event, lowercase the message
         if (
            event[0].type === "MESSAGE_CREATE" &&
            event[0].message.content !== undefined
         ) {
            const selectedGuild = ChannelStore.getChannel(
               SelectedChannelStore.getChannelId()
            ).guild_id;
            if (event[0].message.guild_id !== selectedGuild) return;
            if (event[0].message.author.id === "721692862521278515") {
               const originalMessage = MessageStore.getMessage(
                  event[0].message.channel_id,
                  event[0].message.id
               );
               if (event[0].message.content.slice(-1) === '.') {
                  event[0].message.content = event[0].message.content.toLowerCase().replace(/.$/,"");
               }
               event[0].message.content = event[0].message.content.toLowerCase();
            }
            return;
         }
      });
   },

   onStop() {
      Patcher.unpatchAll();
   }
};

registerPlugin(LowercaseMessages);
