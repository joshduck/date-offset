function toOffset(y, m, d) {
  y -= m <= 2;
  const era = ((y >= 0 ? y : y - 399) / 400) | 0;
  const yoe = y - era * 400;                                                   // [0, 399]
  const doy = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;      // [0, 365]
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;   // [0, 146096]
  return era * 146097 + doe - 719468;
}

function toDate(z) {
  z += 719468;
  const era = ((z >= 0 ? z : z - 146096) / 146097) | 0;
  const doe = z - era * 146097;                                                // [0, 146096]
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);   // [0, 399]
  const y = yoe + era * 400;
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100)); // [0, 365]
  const mp = Math.floor((5 * doy + 2) / 153);                                  // [0, 11]
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1;                          // [1, 31]
  const m = mp + (mp < 10 ? 3 : -9);                                           // [1, 12]

  return {
    year: y + (m <= 2),
    month: m,
    day: d
  };
}

module.exports = {
  toOffset: toOffset,
  toDate: toDate
};
