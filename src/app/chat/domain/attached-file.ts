import Entity from "../../core/domain/entity";

export class AttachedFile extends Entity {

  name: string;
  data: string;
  extension: string;
  contentType: string;
  size: number;

  constructor(value: Partial<AttachedFile> = {}) {
    super();
    Object.assign(this, value);
  }
}
