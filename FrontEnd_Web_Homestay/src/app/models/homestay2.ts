import {ImageOfHomestay} from "./image-of-homestay";
import {HomestayType} from "./homestay-type";
import {City} from "./city";
import {Account} from "./account";

export interface Homestay2 {
  id?: number;
  name?: string;
  address?: string;
  bed_room?: number;
  bath_room?: number;
  price?: number;
  status?: number;
  description?: string;
  homestay_type?: any;
  account?: any;
  city?: any;
  imageOfHomestays?: any;
}
