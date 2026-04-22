const d = new Date(Date.UTC(1899,11,30));
for (const n of [46108,46150,46151,46152,46153,46154,46155,46156,46157,46158,46159,46160,46161,46162]) {
  const x = new Date(d.getTime()+n*86400000);
  console.log(n, x.toISOString().slice(0,10));
}
