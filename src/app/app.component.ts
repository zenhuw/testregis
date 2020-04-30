import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'sindikasiregis';

  form = new FormGroup({
    gender: new FormControl(''),
    profesiMedia: new FormControl(''),
    profesiKreatif: new FormControl(''),
    domisili: new FormControl(''),
    propinsi: new FormControl({value:'',disabled:true}),
    kabupaten: new FormControl(''),
    statusKerja: new FormControl(''),
    kerjaTetap: new FormControl(''),
    kerjaKontrak: new FormControl(''),
    kerjaLepas: new FormControl(''),
    partisipasi: new FormControl(''),
    partisipasiLainnya: new FormControl({value:'',disabled:true}),
    iuran: new FormControl(''),
    cicilanMonths: new FormControl({value:1,disabled:true}),
    cashOrTransfer: new FormControl(''),
    dd: new FormControl(''),
    mm: new FormControl(''),
    yyyy: new FormControl(''),
    date: new FormControl(''),
    // masalah: new FormGroup({
      jamKerja: new FormControl(''),
      perlindunganHukum: new FormControl(''),
      jaminanSosial: new FormControl(''),
      kontrakKerja: new FormControl(''),
      jaminanKesehatan: new FormControl(''),
      bebanKerja: new FormControl(''),
      upahLayak: new FormControl(''),
      hasMasalahLainnya: new FormControl(''),
    // }),
    masalahLainnya: new FormControl({value:'',disabled:true}),

    nama: new FormControl(''),
    tempat: new FormControl(''),
    subsektor: new FormControl(''),
    tempatKerja: new FormControl(''),
    nomerPonsel: new FormControl(''),
    email: new FormControl('',Validators.email),
    bpjs_ks: new FormControl(''),
    bpjs_tk: new FormControl(''),
    alasan: new FormControl(''),
  });

  // left
  // gender;
  // profesi;
  // domisili;
  // propinsi = 'Propinsi';
  // kabupaten = 'Kabupaten';
  // statusKerja;
  // kerjaTetap;
  // kerjaKontrak;
  // kerjaLepas;
  // partisipasi;
  // partisipasiLainnya = '';
  // iuran;
  // cicilanMonths = 12;
  // cashOrTransfer;

  // right
  // nama;
  // tempat;
  // subsektor;
  // tempatKerja;
  // nomerPonsel;
  // email;
  // bpjs_ks;
  // bpjs_tk;

  // alasan;

  masalah = {
    jamKerja: false,
    perlindunganHukum: false,
    jaminanSosial: false,
    kontrakKerja: false,
    jaminanKesehatan: false,
    bebanKerja: false,
    upahLayak: false,
    lainnya: false,
    lainnyaText: '',
  };

  dd;
  mm;
  yyyy;
  date = '00/00/0000';

  partisipasiLainnyaDisabled = true;

  cicilanDisabled = true;

  masalahLainnyaDisabled = true;

  genderOptions = ['Perempuan', 'Laki-laki', 'Tidak tersedia', 'Tidak menjawab', 'Lainnya'];

  provinsiOptions = ['Jawa Barat', 'Jawa Timur'];
  selectedProvinsi;
  kabupatenOptions = ['DKI Jakarta', 'DIY Yogyakarta'];
  selectedKabupaten;

  isFormValid;

  warningMsg;

  ngOnInit(): void {
    // document.getElementById('canvas').addEventListener('click', (e: Event) => this.checkFormValid());
    // document.getElementById('submit-btn').addEventListener('click', (e: Event) => this.checkFormValid());
  }

  onDateInput() {
    // console.log(this.date);
    this.date = this.form.controls["date"].value;

    this.mm = this.date.substr(0, 2);
    this.dd = this.date.substr(3, 2);
    this.yyyy = this.date.substr(6, 4);

    this.form.controls["mm"].setValue(this.mm);
    this.form.controls["dd"].setValue(this.dd);
    this.form.controls["yyyy"].setValue(this.yyyy);
  }

  togglePartisipasiLainnya() {
    // if (this.partisipasi != 'lainnya') this.partisipasiLainnya = '';
    // this.partisipasiLainnyaDisabled = (this.partisipasi === 'lainnya') ? false : true;

    if (this.form.controls["partisipasi"].value != 'lainnya') this.form.controls["partisipasiLainnya"].setValue("");
    // this.partisipasiLainnyaDisabled = (this.form.controls["partisipasi"].value === 'lainnya') ? false : true;
    if (this.form.controls["partisipasi"].value === 'lainnya') this.form.controls["partisipasiLainnya"].enable();
    else this.form.controls["partisipasiLainnya"].disable();
  }

  toggleCicilan() {
    // if satu tahun selected, disable cicilan box
    // and set cicilan to = 0
    // if (this.iuran == 'satuTahun') {
    //   this.cicilanMonths = 12;
    // }
    // this.cicilanDisabled = (this.iuran === 'cicilan') ? false : true;

    if (this.form.controls["iuran"].value == 'satuTahun') {
      this.form.controls["cicilanMonths"].setValue("12");
    }
    // this.cicilanDisabled = (this.form.controls["iuran"].value === 'cicilan') ? false : true;

    if (this.form.controls["iuran"].value === 'cicilan') this.form.controls["cicilanMonths"].enable()
    else this.form.controls["cicilanMonths"].disable();
  }

  toggleMasalahLainnya() {
    // if (!this.masalah.lainnya) this.masalah.lainnyaText = '';

    // this.masalahLainnyaDisabled = !this.masalah.lainnya;

    if (this.form.controls["hasMasalahLainnya"].value == false) this.form.controls["masalahLainnya"].setValue("");

    if (this.form.controls["hasMasalahLainnya"].value == true) this.form.controls["masalahLainnya"].enable();
    else this.form.controls["masalahLainnya"].disable();
    console.log(this.masalahLainnyaDisabled);
  }

  cicilan() {
    const months = this.form.controls["cicilanMonths"].value;
    if (months <= 1) this.form.controls["cicilanMonths"].setValue(1);

    const total = this.form.controls["cicilanMonths"].value * 25;
    const str = total.toString() + '.000';
    console.log(this.form.controls["cicilanMonths"].value);
    return str;
  }

  populateDropdownProvinsi() {
    // get the provinces here

    this.provinsiOptions = [
      // add the data to the list
    ];
  }

  checkIsProvinsiSelected(){
    if (this.form.controls["propinsi"].value != ""){
      this.form.controls["kabupaten"].enable();
      this.populateDropdownKabupaten();
    }
    else this.form.controls["kabupaten"].disable();
  }

  populateDropdownKabupaten() {
    // get the selected province
    const propinsi = this.selectedProvinsi;

    // now get the regency datas

    this.kabupatenOptions = [
      // add the data to the list
    ];
  }

  // makeForm() {
  //   this.form = {
  //     profesi: this.profesi,
  //     domisili: this.domisili,
  //     statusKerja: this.statusKerja,
  //     partisipasi: this.partisipasi,
  //     partisipasiLainnya: this.partisipasiLainnya,
  //     iuran: this.iuran,
  //     cicilanMonths: this.cicilanMonths,
  //     cashOrTransfer: this.cashOrTransfer,

  //     nama: this.nama,
  //     tempat: this.tempat,
  //     dd: this.dd,
  //     mm: this.mm,
  //     yyyy: this.yyyy,
  //     subsektor: this.subsektor,
  //     tempatKerja: this.tempatKerja,
  //     nomerPonsel: this.nomerPonsel,
  //     email: this.email,

  //     alasan: this.alasan,

  //     date: this.date,

  //     masalah: this.masalah,
  //   }
  // }

  checkFormValid() {
    this.isFormValid = this.validateForm();
    console.log(this.warningMsg);
  }

  validateForm() {
    // console.log("Click!");
    // check all fields. if empty, notify user
    // if (!this.gender) {
    //   this.warningMsg = 'Mohon isi gender.';
    //   return false;
    // }
    // if (!this.domisili){
    //   this.warningMsg = "Domisili tidak boleh kosong!";
    //   return false;
    // }
    // if (this.propinsi == 'Propinsi') {
    //   this.warningMsg = 'Domisili tidak boleh kosong!';
    //   return false;
    // }
    // if (this.kabupaten == 'Kabupaten') {
    //   this.warningMsg = 'Domisili tidak boleh kosong!';
    //   return false;
    // }
    // if (!this.kerjaTetap && !this.kerjaKontrak && !this.kerjaLepas) {
    //   this.warningMsg = 'Status Kerja tidak boleh kosong!';
    //   return false;
    // }
    // if (!this.partisipasi) {
    //   this.warningMsg = "Partisipasi tidak boleh kosong! Pilih 'Lainnya' jika tidak tersedia.";
    //   return false;
    // }
    // if (!this.nama) {
    //   this.warningMsg = 'Nama tidak boleh kosong!';
    //   return false;
    // }
    // if (!this.tempat) {
    //   this.warningMsg = 'Tempat & Tanggal Lahir tidak boleh kosong!';
    //   return false;
    // }
    // if (this.date == '00/00/0000') {
    //   this.warningMsg = 'Tempat & Tanggal Lahir tidak boleh kosong!';
    //   return false;
    // }
    // if (!this.subsektor) {
    //   this.warningMsg = 'Subsektor Profesi tidak boleh kosong!';
    //   return false;
    // }
    // if (!this.nomerPonsel) {
    //   this.warningMsg = 'Nomer Ponsel tidak boleh kosong!';
    //   return false;
    // }
    // if (!this.email) {
    //   this.warningMsg = 'Alamat Email tidak boleh kosong!';
    //   return false;
    // }
    // if (!this.bpjs_ks) {
    //   this.warningMsg = 'Apakah kamu peserta BPJS Kesehatan?';
    //   return false;
    // }
    // if (!this.bpjs_tk) {
    //   this.warningMsg = 'Apakah kamu peserta BPJS Ketenagakerjaan?';
    //   return false;
    // }
    // if (!this.iuran) {
    //   this.warningMsg = 'Mohon pilih pembayaran Iuran Perdana.';
    //   return false;
    // }
    // if (this.cicilanMonths <= 0) {
    //   this.warningMsg = 'Pembayaran minimum Iuran Perdana adalah 1 (satu) bulan.';
    //   return false;
    // }
    // if (!this.cashOrTransfer) {
    //   this.warningMsg = 'Mohon pilih salah satu metode pembayaran.';
    //   return false;
    // }
    // return true;
  }

  notifyIncomplete() {
    // disini kasih notif
    console.log(this.warningMsg);
  }

  submit() {
    // if (this.validateForm()) {
    //   this.makeForm();
    //   console.log(this.form);
    // }
    // else {
    //   this.notifyIncomplete();
    // }
    // const form = this.form;
    // disini kirim
  }

  // @Input('date')
  // get cicilan(): String {
  //   let total = (25*this.cicilanMonths).toString + ".000";
  //     return total;
  // }

  // set date(val) {

  // }
}
