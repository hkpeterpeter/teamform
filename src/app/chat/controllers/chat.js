export default class ChatCtrl {
    constructor($location, $state, $timeout, chatService, authService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.chatService = chatService;
        this.authService = authService;
        this.error = null;
        this.message = {};
        this.messages = [];
        this.data = [];
        this.getMessages();
        this.chatroom= {};
        this.chatrooms = [];
        this.getChatrooms();
    }
    async getMessages() {
        try {
            let messages = await this.chatService.getMessages();
            this.$timeout(() => {
                this.messages = messages;
                this.messages.createdBy = messages.createdBy;
                this.data = messages.data;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async send() {
        let user = await this.authService.getUser();
        if (user != null && this.message.data) {
            this.message.createdBy = user.uid;
            this.message.createdAt = Date.now();
            try {
                let result = this.chatService.sendMessage(this.message);
                this.$timeout(() => {
                    this.message = {};
                });
            } catch (error) {
                this.$timeout(() => {
                    this.error = error;
                });
            }
        }
    }

    async getChatrooms(){
      try {
          let chatrooms = await this.chatService.getChatrooms();
          this.$timeout(() => {
              this.chatrooms = chatrooms;
          });
      } catch (error) {
          this.$timeout(() => {
              this.error = error;
          });
      }
    }

}

ChatCtrl.$inject = ['$location', '$state', '$timeout', 'ChatService', 'AuthService'];
