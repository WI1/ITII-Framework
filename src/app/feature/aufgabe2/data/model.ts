
export interface ComponentDetail {
    label: string;
    unit: string;
    value: number;
}

export interface Components {
    alarmstatus: ComponentDetail;
    battery: ComponentDetail;
    co2: ComponentDetail;
    humidity: ComponentDetail;
    internal_temp: ComponentDetail;
    pressure: ComponentDetail;
    ul_counter: ComponentDetail;
}

export interface Subpackets {
    frequency: number[];
    rssi: number[];
    snr: number[];
}
  
export interface BaseStation {
    bsEui: number;
    eqSnr: number;
    mode: string;
    profile: string;
    rssi: number;
    rxTime: number;
    snr: number;
    subpackets: Subpackets;
}
  
export interface Meta {
    name: string;
    vendor: string;
}
  
export interface DataObject {
    baseStations: BaseStation[];
    cnt: number;
    components: Components;
    data: number[];
    dlAck: boolean;
    dlOpen: boolean;
    format: number;
    meta: Meta;
    responseExp: boolean;
    typeEui: number;
}