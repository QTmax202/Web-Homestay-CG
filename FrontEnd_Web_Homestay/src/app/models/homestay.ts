import {HomestayType} from "./homestay-type";
import {Account} from "./account";
import {City} from "./city";

export interface Homestay {
  id?: number,
  name?: string,
  address?: string,
  bed_room?: string,
  bath_room?: string,
  price?: number,
  status?: boolean,
  description?: string,
  homestay_type_id?: HomestayType
  account_id?: Account,
  city_id?: City,
}
