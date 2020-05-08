import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Service } from '../register.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  title = 'sindikasiregis';

  form: FormGroup;

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

  provinces: Promise<any[]> | null = null;
  regencies: Promise<any[]> | null = null;

  constructor(
    private register: Service,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    // this.initForm_OLD();

    this.provinces = this.register.provinces();
    this.formChanges();
    // document.getElementById('canvas').addEventListener('click', (e: Event) => this.checkFormValid());
    // document.getElementById('submit-btn').addEventListener('click', (e: Event) => this.checkFormValid());
  }

  formToSubmit;

  initForm() {
    this.form = this.formBuilder.group({
      gender: [null, [Validators.required]],
      profesi: this.formBuilder.group
        ({
          profesiMedia: [false],
          profesiKreatif: [false],
        }, { validators: requireCheckboxesToBeCheckedValidator() }
        ),
      domisili: this.formBuilder.group
        ({
          propinsi: [null, [Validators.required]],
          kabupaten: [null, [Validators.required]],
        }),
      statusKerja: this.formBuilder.group
        ({
          kerjaTetap: [false],
          kerjaKontrak: [false],
          kerjaLepas: [false],
        }, { validators: requireCheckboxesToBeCheckedValidator() }
        ),
      partisipasi: [null, [Validators.required]],
      partisipasiLainnya: [{ value: null, disabled: true }],
      // iuran: [null, [Validators.required]],
      // cicilanMonths: this.formBuilder.group(
      //   { inputValue: [{ value: 1, disabled: true }] },
      //   [Validators.required, Validators.min(1)],
      // ),
      // cashOrTransfer: ['', [Validators.required]],
      dd: [{ value: 'DD', disabled: true }],
      mm: [{ value: 'MM', disabled: true }],
      yyyy: [{ value: 'YYYY', disabled: true }],
      date: [null, [Validators.required]],

      masalah: this.formBuilder.group
        ({
          jamKerja: [false],
          perlindunganHukum: [false],
          jaminanSosial: [false],
          kontrakKerja: [false],
          jaminanKesehatan: [false],
          bebanKerja: [false],
          upahLayak: [false],
          lainnya: ['']
        }),

      nama: [null, [Validators.required]],
      tempat: [null, [Validators.required]],
      subsektor: [null, [Validators.required]],
      tempatKerja: [''],
      nomerPonsel: [null, [Validators.required, Validators.maxLength(12)]],
      email: [null, [Validators.required, Validators.email]],
      bpjs_ks: [null, [Validators.required]],
      bpjs_tk: [null, [Validators.required]],
      alasan: [''],
    });
  }

  // isFieldValid(field: string) {
  //   return !this.form.get(field).valid && this.form.get(field).touched;
  // }

  // displayFieldCss(field: string) {
  //   return {
  //     'has-error': this.isFieldValid(field),
  //     'has-feedback': this.isFieldValid(field)
  //   };
  // }

  formChanges(): void {
    this.form.get('domisili.propinsi').valueChanges.subscribe(val => {
      this.getRegencies(val);
    });
  }

  getRegencies(provinceId: number) {
    this.regencies = this.register.regencies(provinceId);
  }

  onDateInput() {
    // console.log(this.date);
    this.date = this.form.controls.date.value;

    this.mm = this.date.substr(0, 2);
    this.dd = this.date.substr(3, 2);
    this.yyyy = this.date.substr(6, 4);

    this.form.controls.mm.setValue(this.mm);
    this.form.controls.dd.setValue(this.dd);
    this.form.controls.yyyy.setValue(this.yyyy);
  }

  togglePartisipasiLainnya() {
    // if (this.partisipasi != 'lainnya') this.partisipasiLainnya = '';
    // this.partisipasiLainnyaDisabled = (this.partisipasi === 'lainnya') ? false : true;

    if (this.form.controls.partisipasi.value != 'lainnya') { this.form.controls.partisipasiLainnya.setValue(''); }
    // this.partisipasiLainnyaDisabled = (this.form.controls["partisipasi"].value === 'lainnya') ? false : true;
    if (this.form.controls.partisipasi.value === 'lainnya') { this.form.controls.partisipasiLainnya.enable(); }
    else { this.form.controls.partisipasiLainnya.disable(); }
  }

  toggleCicilan() {
    // if satu tahun selected, disable cicilan box
    // and set cicilan to = 0
    // if (this.iuran == 'satuTahun') {
    //   this.cicilanMonths = 12;
    // }
    // this.cicilanDisabled = (this.iuran === 'cicilan') ? false : true;

    if (this.form.controls.iuran.value == 'satuTahun') {
      this.form.controls.cicilanMonths.setValue('12');
    }
    // this.cicilanDisabled = (this.form.controls["iuran"].value === 'cicilan') ? false : true;

    if (this.form.controls.iuran.value === 'cicilan') { this.form.controls.cicilanMonths.enable(); }
    else { this.form.controls.cicilanMonths.disable(); }
  }

  toggleMasalahLainnya() {
    // if (!this.masalah.lainnya) this.masalah.lainnyaText = '';

    // this.masalahLainnyaDisabled = !this.masalah.lainnya;

    if (this.form.controls.masalah["lainnya"].value == false) { this.form.controls.masalah["lainnyaInput"].setValue(''); }

    if (this.form.controls.masalah["lainnya"].value == true) { this.form.controls.masalah["lainnyaInput"].enable(); }
    else { this.form.controls.masalah["lainnyaInput"].disable(); }
  }

  cicilan() {
    const months = this.form.controls.cicilanMonths.value;
    if (months <= 1) { this.form.controls.cicilanMonths.setValue(1); }

    const total = this.form.controls.cicilanMonths.value * 25;
    const str = total.toString() + '.000';
    console.log(this.form.controls.cicilanMonths.value);
    return str;
  }

  populateDropdownProvinsi() {
    // get the provinces here

    this.provinsiOptions = [
      // add the data to the list
    ];
  }

  checkIsProvinsiSelected() {
    if (this.form.controls.propinsi.value != '') {
      this.form.controls.kabupaten.enable();
      this.populateDropdownKabupaten();
    }
    else { this.form.controls.kabupaten.disable(); }
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
    if (this.form.valid) {
      this.register.register(this.form.value).then(res => {
        alert('Registrasi Berhasil');
        this.form.reset();
      }).catch(Err => { alert(Err); });
    }
    else {
      alert('Lengkapi semua data wajib!');
      Object.keys(this.form.controls).forEach(field => { // {1}
        const control = this.form.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
      console.log(this.form);
    }
  }

  initForm_OLD() {

    this.form = new FormGroup({
      gender: new FormControl(''),
      profesiMedia: new FormControl(''),
      profesiKreatif: new FormControl(''),
      domisili: new FormGroup({
        propinsi: new FormControl(''),
        kabupaten: new FormControl(''),
      }),
      statusKerja: new FormGroup({
        kerjaTetap: new FormControl(''),
        kerjaKontrak: new FormControl(''),
        kerjaLepas: new FormControl(''),
      }),
      partisipasi: new FormControl(''),
      partisipasiLainnya: new FormControl({ value: '', disabled: true }),
      iuran: new FormControl(''),
      cicilanMonths: new FormControl({ value: 1, disabled: true }),
      cashOrTransfer: new FormControl(''),
      dd: new FormControl({ value: '', disabled: true }),
      mm: new FormControl({ value: '', disabled: true }),
      yyyy: new FormControl({ value: '', disabled: true }),
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
      masalahLainnya: new FormControl({ value: '', disabled: true }),

      nama: new FormControl(''),
      tempat: new FormControl(''),
      subsektor: new FormControl(''),
      tempatKerja: new FormControl(''),
      nomerPonsel: new FormControl(''),
      email: new FormControl('', Validators.email),
      bpjs_ks: new FormControl(''),
      bpjs_tk: new FormControl(''),
      alasan: new FormControl(''),
    });
  }
}

export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    let checked = 0;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxesToBeChecked: true,
      };
    }

    return null;
  };
}
