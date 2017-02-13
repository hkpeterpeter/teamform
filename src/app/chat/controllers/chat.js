export default class ChatCtrl {
    constructor($location, $state, $timeout, authService, chatService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.authService = authService;
        this.chatService = chatService;
        this.error = null;
        this.message = {};
        this.messages = [];
        this.init();
        this.getMessages();
    }
    async init() {
        let user = await this.authService.getUser();
        if(user) {
            this.$timeout(() => {
                this.me = user.uid;
            });
        }
    }
    async getMessages() {
        try {
            let messages = await this.chatService.getMessages();
            this.$timeout(() => {
                this.messages = messages;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async send() {
        let user = await this.authService.getUser();
        if (user != null && this.message.content) {
            try {
                let result = await this.chatService.sendMessage(this.message);
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

    // async getChatrooms() {
    //     try {
    //         let chatrooms = await this.chatService.getChatrooms();
    //         this.$timeout(() => {
    //             this.chatrooms = chatrooms;
    //         });
    //     } catch (error) {
    //         this.$timeout(() => {
    //             this.error = error;
    //         });
    //     }
    // }
    //
    // async create() {
    //     if (this.chatroom.name) {
    //         try {
    //             let result = await this.chatService.createChatroom(this.chatroom);
    //             this.$timeout(() => {
    //                 this.chatroom = {};
    //             });
    //         } catch (error) {
    //             this.$timeout(() => {
    //                 this.error = error;
    //             });
    //         }
    //     }
    // }

}

ChatCtrl.$inject = ['$location', '$state', '$timeout', 'AuthService', 'ChatService'];
