class MessageDto {
    constructor(message) {
        this.author = message.author;
        this.text = message.text;
        this.timestampCreation = message.timestamp;
        this.timestampMod = message.timestamp;
    }
}
