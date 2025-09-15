export abstract class BaseEntity {
    public readonly id!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
    public abstract equals(entity: BaseEntity): boolean;
  }