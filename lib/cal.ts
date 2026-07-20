export const CAL_API_BASE_URL = "https://api.cal.com/v2";
export const CAL_SLOTS_API_VERSION = "2024-09-04";
export const CAL_BOOKINGS_API_VERSION = "2024-08-13";

const eventTypeEnvByService = {
  "Website Development": "CAL_EVENT_TYPE_ID_WEBSITE_DEVELOPMENT",
  "Online Presence": "CAL_EVENT_TYPE_ID_ONLINE_PRESENCE",
  "AI Automation": "CAL_EVENT_TYPE_ID_AI_AUTOMATION",
  "App Development": "CAL_EVENT_TYPE_ID_APP_DEVELOPMENT",
  "Digital Branding": "CAL_EVENT_TYPE_ID_DIGITAL_BRANDING",
  "Ads Management": "CAL_EVENT_TYPE_ID_ADS_MANAGEMENT",
} as const;

export type CalService = keyof typeof eventTypeEnvByService;

export function getCalEventTypeId(service: string) {
  const envName = eventTypeEnvByService[service as CalService];
  const value = envName ? process.env[envName] : undefined;
  const eventTypeId = Number(value || process.env.CAL_EVENT_TYPE_ID);

  return Number.isInteger(eventTypeId) && eventTypeId > 0 ? eventTypeId : null;
}

export function isCalService(service: string): service is CalService {
  return service in eventTypeEnvByService;
}

export function calHeaders(version: string) {
  return {
    Authorization: `Bearer ${process.env.CAL_API_KEY}`,
    "cal-api-version": version,
  };
}
