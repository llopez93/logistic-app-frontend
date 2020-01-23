export default abstract class Entity {
    id: number;

    equals(entity: Entity): boolean {
        return entity != null && this.id != null && entity.id === this.id;
    }
}
