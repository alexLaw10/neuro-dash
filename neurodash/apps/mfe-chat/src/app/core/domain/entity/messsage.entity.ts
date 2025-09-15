import { BaseEntity } from "./base.entity";

export class MessageEntity extends BaseEntity {
    public override readonly id!: string;
    public readonly agentId!: string;
    public readonly message!: string;
    public readonly sender!: 'user' | 'agent';
    public readonly timestamp!: Date;
    public readonly isTyping?: boolean;
    public override readonly createdAt!: Date;
    public override readonly updatedAt!: Date;

    public equals(entity: BaseEntity): boolean {
        return entity instanceof MessageEntity && entity.id === this.id;
    }
}