function formatToRupiah(price) {
  // Menggunakan fungsi toLocaleString untuk mengonversi ke format Rupiah tanpa desimal
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default formatToRupiah;
