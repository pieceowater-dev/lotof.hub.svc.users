interface EntityInfo {
  count: number;
}

export interface PaginatedEntity<Entity> {
  rows: Entity[];
  info: EntityInfo;
}
