<template>
  <div class="messenger" v-if="ready & (chatrooms.length > 0)">
    <div class="messenger__left">
      <div class="messenger__left__top">
        <div class="messenger__left__top__center">Chat</div>
      </div>
      <div class="messenger__left__contacts">
        <contact
          v-for="chat in chatrooms"
          :key="chat.id"
          :id="chat.id"
          :selected="selectedId"
          :name="chat.target.username"
          :msgs="chat.messages"
          @change-selected="changeChat"
        />
      </div>
    </div>
    <div class="messenger__right">
      <div class="messenger__right__top">
        <div class="messenger__right__top__avatar">
          <img
            :src="foundAvatar ? avatarUrl : defaultAvatar"
            @error="() => (foundAvatar = false)"
          />
        </div>
        <router-link :to="`/u/${selectedChatroom.target.username}`">
          {{ selectedChatroom.target.username }}</router-link
        >
      </div>
      <div class="messenger__right__messages">
        <message
          v-for="(msg, idx) in selectedChatroom.messages"
          :key="idx"
          :mine="msg.user === currentUserName"
          :content="msg.content"
        />
      </div>
      <div class="messenger__right__input">
        <form @submit.prevent="">
          <input
            v-model="newMsg"
            type="text"
            maxlength="140"
            placeholder="New message..."
            @keydown.enter="sendMsg"
          />
          <input :class="{ valid: validInput }" type="submit" value="Send" @click="sendMsg" />
        </form>
      </div>
    </div>
  </div>
  <h1 class="no-friends" v-else-if="(chatrooms.length === 0) & ready">Nothing here...</h1>
  <img class="loading-gif" src="/img/loading.gif" v-else />
</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import { mapState } from 'vuex';
import firebase from 'firebase';

import db from '../firebase';

import Contact from '../components/Messages/Contact.vue';
import Message from '../components/Messages/Message.vue';

export default {
  name: 'Messages',
  components: {
    Contact,
    Message,
  },
  data() {
    return {
      ready: false,
      chatrooms: [],
      selectedId: '',
      messages: [],
      unsubFunction: null,
      newMsg: '',
      defaultAvatar: '/img/profile-default.png',
      foundAvatar: true,
    };
  },
  computed: {
    ...mapState({
      auth: (state) => state.isAuth,
      currentUserId: (state) => state.user.currentUserId,
      currentUserName: (state) => state.user.currentUserName,
    }),
    selectedChatroom() {
      return this.chatrooms.find((room) => room.id === this.selectedId);
    },
    validInput() {
      return this.newMsg.length > 0 && this.newMsg.length < 140;
    },
    avatarUrl() {
      return `https://firebasestorage.googleapis.com/v0/b/camra-4feb8.appspot.com/o/${this.selectedChatroom.target.username}_avatar?alt=media`;
    },
  },
  methods: {
    sendMsg() {
      if (this.validInput) {
        const currentChatRef = db.collection('chatrooms').doc(this.selectedId);
        currentChatRef
          .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
              content: this.newMsg,
              user: this.currentUserName,
            }),
          })
          .then(() => (this.newMsg = ''));
      }
    },
    changeChat(id) {
      this.selectedId = id;
    },
    listenToChanges() {
      this.unsubFunction = db
        .collection('chatrooms')
        .where('ids', 'array-contains', this.currentUserId)
        .onSnapshot((snap) => {
          snap.docChanges().forEach((change) => {
            const newOrChangeChatroom = {
              id: change.doc.id,
              target: change.doc.data().users.filter((u) => u.username !== this.currentUserName)[0],
              messages: change.doc.data().messages,
            };
            if (change.doc.metadata.hasPendingWrites) {
              if (change.type === 'added') {
                this.chatrooms.push(newOrChangeChatroom);
              }
            }
            if (change.type === 'modified') {
              this.chatrooms = this.chatrooms.map((chatroom) =>
                chatroom.id === newOrChangeChatroom.id ? newOrChangeChatroom : chatroom
              );
            }
            if (change.type === 'removed') {
              this.chatrooms = this.chatrooms.filter(
                (chatroom) => chatroom.id !== newOrChangeChatroom.id
              );
            }
          });
        });
    },
    getChatrooms() {
      db.collection('chatrooms')
        .where('ids', 'array-contains', this.currentUserId)
        .get()
        .then((qs) => {
          qs.forEach((doc) => {
            const chatroom = {
              id: doc.id,
              target: doc.data().users.filter((u) => u.username !== this.currentUserName)[0],
              messages: doc.data().messages,
            };
            this.chatrooms.push(chatroom);
          });
          if (this.chatrooms.length > 0) this.selectedId = this.chatrooms[0].id;
          this.ready = true;
        });
    },
    readyUp() {
      if (!this.auth) this.$router.push({ name: 'Timeline' });
      else {
        this.listenToChanges();
        this.getChatrooms();
      }
    },
  },
  mounted() {
    this.readyUp();
  },
  beforeDestroy() {
    if (this.unsubFunction) this.unsubFunction();
  },
};
</script>

<style lang="scss">
.no-friends {
  font-family: 'Amatic SC', cursive;
  font-size: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.messenger {
  max-width: 975px;
  height: calc(100vh - 100px);
  margin: 20px auto;
  border: 1px solid var(--border);
  background: #fff;
  display: flex;

  @media (max-width: 975px) {
    margin: 0 auto;
    height: calc(100vh - 55px);
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }

  &__left {
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;

    @media (min-width: 701px) {
      width: 350px;
    }

    &__top {
      height: 60px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;

      @media (max-width: 700px) {
        display: none;
      }

      &__side {
        width: 25px;
        height: 25px;

        img {
          height: 100%;
          cursor: pointer;
        }
      }

      &__center {
        flex-grow: 1;
        text-align: center;
        font-family: 'Amatic SC', cursive;
        font-size: xx-large;
        letter-spacing: 2px;
        font-weight: 700;
      }
    }

    &__contacts {
      flex-grow: 1;
      padding-top: 15px;
      overflow: auto;

      @media (max-width: 700px) {
        display: flex;
        padding: 0;
      }
    }
  }

  &__right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    &__top {
      height: 60px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      padding: 10px 20px;

      @media (max-width: 700px) {
        border-top: 1px solid var(--border);
      }

      &__avatar {
        height: 30px;
        width: 30px;
        margin-right: 20px;

        img {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }

      a {
        font-size: larger;
      }
    }

    &__messages {
      flex-grow: 1;
      overflow: auto;
    }

    &__input {
      height: 70px;

      form {
        width: calc(100% - 40px);
        height: calc(100% - 20px);
        border: 1px solid var(--border);
        margin: 10px 20px;
        border-radius: 25px;
        display: flex;
        padding: 0 15px;

        input {
          border: none;
          background: none;

          &:focus {
            outline: none;
          }

          &:first-of-type {
            flex-grow: 1;
            padding: 0 10px;
          }

          &:last-of-type {
            color: var(--accent);
            font-weight: 700;
            letter-spacing: 3px;
            opacity: 0.5;
            transition: all 0.25s ease-out;

            &.valid {
              cursor: pointer;
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
