export default class Material {
  constructor(id, client_id, material_name, material_rate) {
    this.id = id;
    this.client_id = client_id;
    this.material_name = material_name;
    this.material_rate = material_rate;
  }

  getObject() {
    return {
      id: this.id,
      client_id: this.client_id,
      material_name: this.material_name,
      material_rate: this.material_rate
    };
  }
}
