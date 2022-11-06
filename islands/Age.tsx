export default function Age() {
  return (
    <span>
      {(() => {
        const date = new Date();
        return (
          date.getFullYear() - 2006 - (date.getMonth() + 1 < 10
            ? 1
            : date.getMonth() + 1 === 10 && date.getDay() < 27
            ? 1
            : 0)
        );
      })()}
    </span>
  );
}
