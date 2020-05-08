import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as momentD from 'moment';

@Injectable({
  providedIn: 'root'
})
export class Service {

  API_URL = 'http://157.230.245.31:1323/';

  constructor(private http: HttpClient) { }

  async register(req): Promise<any> {
    let body = new HttpParams()
      .set('Name', req.nama)
      .set('Email', req.email)
      .set('Role', '2')
      .set('Approved', 'false')
      .set('Active', 'false')
      .set('Pob', req.tempat)
      .set('Dob', momentD(req.date).format('YYYY-MM-DD'))
      .set('PlaceOfWork', req.tempatKerja)
      .set('Phone', req.nomerPonsel)
      .set('ParticipatePart', req.partisipasi)
      .set('ParticipatePartOther', req.partisipasiLainnya ? req.partisipasiLainnya : "")
      .set('JoinReason', req.alasan)
      .set('Province', req.domisili['propinsi'])
      .set('City', req.domisili['kabupaten'])
      .set('WorkFieldSub', req.subsektor)
      .set('WorkProblemOther', req.masalahLainnya ? req.masalahLainnya : "")
      .set("Bpjsks", req.bpjs_ks)
      .set("Bpjstk", req.bpjs_tk)

    if (req.profesi['profesiMedia'] !== null && req.profesi['profesiMedia'] !== false) {
      console.log("adding workfield media");
      body = body.append('WorkField', 'Media');
    }

    if (req.profesi['profesiKreatif'] !== null && req.profesi['profesiKreatif'] !== false) {
      console.log("adding workfield creative");
      body = body.append('WorkField', 'Kreatif');
    }

    if (req.masalah['jamKerja'] !== null && req.masalah['jamKerja'] !== false) {
      body = body.append('WorkProblem', 'Jam Kerja');
    }

    if (req.masalah['kontrakKerja'] !== null && req.masalah['kontrakKerja'] !== false) {
      body = body.append('WorkProblem', 'Kontrak Kerja');
    }

    if (req.masalah['upahLayak'] !== null && req.masalah['upahLayak'] !== false) {
      body = body.append('WorkProblem', 'Upah Layak');
    }

    if (req.masalah['perlindunganHukum'] !== null && req.masalah['perlindunganHukum'] !== false) {
      body = body.append('WorkProblem', 'Perlindungan Hukum');
    }

    if (req.masalah['jaminanKesehatan'] !== null && req.masalah['jaminanKesehatan'] !== false) {
      body = body.append('WorkProblem', 'Jaminan Kesehatan');
    }
    if (req.masalah['jaminanSosial'] !== null && req.masalah['jaminanSosial'] !== false) {
      body = body.append('WorkProblem', 'Jaminan Sosial');
    }

    if (req.masalah['bebanKerja'] !== null && req.masalah['bebanKerja'] !== false) {
      body = body.append('WorkProblem', 'Beban Kerja');
    }

    if (req.statusKerja['kerjaTetap'] !== null && req.statusKerja['kerjaTetap'] !== false) {
      body = body.append('WorkStatus', 'Tetap');
    }

    if (req.statusKerja['kerjaKontrak'] !== null && req.statusKerja['kerjaKontrak'] !== false) {
      body = body.append('WorkStatus', 'Kontrak');
    }

    if (req.statusKerja['kerjaLepas'] !== null && req.statusKerja['kerjaLepas'] !== false) {
      body = body.append('WorkStatus', 'Freelance');
    }

    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    try {
      const res = await this.http.post(`${this.API_URL}register`,
        body, httpOptions
      ).toPromise();

      return res;
    } catch (error) {
      console.log(error);
      throw new Error('Something Wrong With The Request');
    }
  }

  async provinces(): Promise<any[]> {
    let res;
    try {
      res = await this.http.get(`${this.API_URL}provinces`).toPromise();
    } catch (err) {
      throw new Error(err);
    }
    if (res) {
      const provinces: any[] = JSON.parse(res.results as any);
      provinces.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }


        return 0;
      });
      return provinces;
    } else {
      throw new Error('Connection Error / Unauthorized');
    }
  }

  async regencies(id: number): Promise<any[]> {
    let res;
    try {
      res = await this.http.get(`${this.API_URL}regencies`).toPromise();
    } catch (err) {
      throw new Error(err);
    }
    if (res) {
      let regencies: any[] = JSON.parse(res.results as any);
      console.log(regencies);
      console.log(id);
      regencies = regencies.filter(res => {
        if (res.province_id == id) {
          return true;
        } else {
          return false;
        }
      });
      console.log(regencies);
      regencies.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return regencies;
    } else {
      throw new Error('Connection Error / Unauthorized');
    }
  }


}
