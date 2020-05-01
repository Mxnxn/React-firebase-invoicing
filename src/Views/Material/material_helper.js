import Material from "./material_model";

export default class MaterialHelper {
  toMaterialEntry(id, client_id, data) {
    return new Material(id, client_id, data.material_name, data.material_rate);
  }
}
