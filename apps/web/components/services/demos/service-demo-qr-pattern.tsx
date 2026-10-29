type ServiceDemoQrPatternProps = { label: string };

export function ServiceDemoQrPattern({ label }: ServiceDemoQrPatternProps) {
  return (
    <div className="service-demo__qr" role="img" aria-label={label}>
      {Array.from({ length: 49 }, (_, index) => (
        <i
          aria-hidden="true"
          className={
            [
              0, 1, 2, 7, 9, 10, 14, 15, 16, 18, 20, 22, 24, 27, 28, 30, 32, 34,
              36, 38, 40, 42, 43, 44, 46, 47, 48,
            ].includes(index)
              ? "is-filled"
              : undefined
          }
          key={index}
        />
      ))}
    </div>
  );
}
