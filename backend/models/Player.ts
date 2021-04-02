class Player {
    name: string;
    points: number;
    admin: boolean;
    id: string
    constructor(name: string, id: string) {
        this.name = name
        this.id = id
        this.points = 0
        this.admin = false
    }
}
export default Player