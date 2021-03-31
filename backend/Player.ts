class Player {
    name: string
    room: string
    id: string
    constructor(name: string, room: string, id: string) {
        this.name = name
        this.room = room
        this.id = id
    }
    function getObject(): Player {
        return {
            name: this.name,
            room: this.room,
            id: this.id
        }
    }
}

export default Player