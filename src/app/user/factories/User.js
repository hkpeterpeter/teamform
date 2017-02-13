import angular from 'angular';
export default class User {
    constructor(snap, $injector) {
        this.$firebaseArray = $injector.get('$firebaseArray');
        this.$firebaseObject = $injector.get('$firebaseObject');
        this.$database = $injector.get('database');
        this.$id = snap.key;
        this.update(snap);
    }
    async update(snap) {
        let oldData = angular.extend({}, this.data);
        this.data = snap.val();
        return !angular.equals(this.data, oldData);
    }
    getImageUrl() {
        if(this.data.imageUrl) {
            return this.data.imageUrl;
        }
        return 'https://placeholdit.imgix.net/~text?txtsize=33&txt='+encodeURIComponent(this.data.name)+'&w=200&h=200';
    }
    isAdmin() {
        return this.data.role === 'admin';
    }
    getGender() {
        if(this.data.gender == 'F') {
            return 'female';
        } else {
            return 'male';
        }
    }
    toJSON() {
        return this.data;
    }
}
