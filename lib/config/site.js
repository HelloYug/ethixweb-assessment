const configuredGoogleMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || '';

export const siteConfig = Object.freeze({
  analytics: Object.freeze({
    googleMeasurementId: /^G-[A-Z0-9]+$/i.test(configuredGoogleMeasurementId)
      ? configuredGoogleMeasurementId
      : '',
  }),
});
