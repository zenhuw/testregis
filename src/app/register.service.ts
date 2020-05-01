import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as momentD from 'moment';

@Injectable({
  providedIn: 'root'
})
export class Service {

  API_URL = 'http://localhost:1323/';

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
      .set('Province', req.propinsi)
      .set('City', req.kabupaten)
      .set('WorkFieldSub', req.subsektor)
      .set('WorkProblemOther', req.masalahLainnya ? req.masalahLainnya : "")
      .set("Bpjsks", req.bpjs_ks)
      .set("Bpjstk", req.bpjs_tk)

    if (req.profesiMedia !== null && req.profesiMedia !== false) {
      body = body.append('WorkField', 'Media');
    }

    if (req.profesiKreatif !== null && req.profesiKreatif !== false) {
      body = body.append('WorkField', 'Kreatif');
    }

    if (req.jamKerja !== null && req.jamKerja !== false) {
      body = body.append('WorkProblem', 'Jam Kerja');
    }

    if (req.kontrakKerja !== null && req.kontrakKerja !== false) {
      body = body.append('WorkProblem', 'Kontrak Kerja');
    }

    if (req.upahLayak !== null && req.upahLayak !== false) {
      body = body.append('WorkProblem', 'Upah Layak');
    }

    if (req.perlindunganHukum !== null && req.perlindunganHukum !== false) {
      body = body.append('WorkProblem', 'Perlindungan Hukum');
    }

    if (req.jaminanKesehatan !== null && req.jaminanKesehatan !== false) {
      body = body.append('WorkProblem', 'Jaminan Kesehatan');
    }
    if (req.jaminanSosial !== null && req.jaminanSosial !== false) {
      body = body.append('WorkProblem', 'Jaminan Sosial');
    }

    if (req.bebanKerja !== null && req.bebanKerja !== false) {
      body = body.append('WorkProblem', 'Beban Kerja');
    }

    if (req.kerjaTetap !== null && req.kerjaTetap !== false) {
      body = body.append('WorkStatus', 'Tetap');
    }

    if (req.kerjaKontrak !== null && req.kerjaKontrak !== false) {
      body = body.append('WorkStatus', 'Kontrak');
    }

    if (req.kerjaLepas !== null && req.kerjaLepas !== false) {
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
