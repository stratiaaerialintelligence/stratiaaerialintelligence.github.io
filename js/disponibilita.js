 (function(){
   "use strict";

   // =========================================================
   // CONFIG
   // =========================================================
   var API_URL = "https://script.google.com/macros/s/AKfycbwn6fmCrvxK6uEhnN9Bi9qv4fPOm6rDi7OGgUMxC0eW_EaYCQS8eDAq2wyNra-E6aIiRA/exec";

   
   // =========================================================
   // SERVIZI 
   // =========================================================---
  var SERVICES = [
     {
       id: "ispezioni_edili",
       label: "Ispezioni edili e infrastrutturali",
       desc: "Documentazione tecnica e valutazione preliminare dello stato di conservazione di strutture civili e infrastrutturali. L’acquisizione aerea consente l’accesso a zone difficilmente raggiungibili senza opere provvisionali o mezzi speciali.",
       packages: [
         { id:"edile_basic", label:"Edificio singolo", desc:"Facciata + copertura", price: 450 },
         { id:"edile_pro",   label:"Copertura / immobile complesso", desc:"Capannoni, tetti articolati", price: 650 },
         { id:"edile_tech",  label:"Infrastruttura complessa", desc:"Ponte / viadotto / opera articolata", price: 950 }
       ],
       addons: [
         { id:"edile_addons1", label:"Report fotografico strutturato", desc:"Indice + evidenze", price: 120 },
         { id:"edile_addons2", label:"Video ispezione mirato", desc:"Clip selezionate", price: 180 },
         { id:"edile_addons3", label:"Report tecnico con nota ingegneristica", desc:"Osservazioni + criticità", price: 390 }
       ]
     },
     {
       id: "ispezioni_navali",
       label: "Ispezioni navali e su draghe",
       desc: "Documentazione tecnica e monitoraggio visivo di unità navali e mezzi operativi in ambito portuale e costiero.",
       packages: [
         { id:"navale_basic", label:"Unità piccola/media", desc:"Documentazione scafo / sovrastrutture", price: 650 },
         { id:"navale_pro",   label:"Draga o mezzo operativo complesso", desc:"Riprese e documentazione su più aree operative", price: 950 },
         { id:"navale_tech",  label:"Monitoraggio operativo", desc:"Finestra temporale + coordinamento", price: 1250 }
       ],
       addons: [
         { id:"navale_addons1", label:"Report fotografico strutturato", desc:"Indice + evidenze", price: 120 },
         { id:"navale_addons2", label:"Video ispezione mirato", desc:"Clip selezionate / riprese operative", price: 220 },
         { id:"navale_addons3", label:"Relazione tecnica di accompagnamento", desc:"Sintesi e note per uso manutentivo/operativo", price: 290 }
       ]
     },
     {
       id: "fotogrammetria",
       label: "Fotogrammetria",
       desc: "Acquisizione fotogrammetrica per la generazione di ortofoto e modelli 3D a supporto di analisi tecniche e progettuali.",
       packages: [
         { id:"fotogrammetria_basic", label:"Area piccola", desc:"Fino a 1 ora", price: 900 },
         { id:"fotogrammetria_pro",   label:"Area media", desc:"1–5 ore", price: 1450 },
         { id:"fotogrammetria_tech",  label:"Area complessa", desc:"Urbano / infrastrutture / ostacoli", price: 1950 }
       ],
       addons: [
         { id:"fotogrammetria_addons1", label:"Modello 3D / point cloud", desc:"Oltre ortofoto", price: 450 },
         { id:"fotogrammetria_addons2", label:"Export tecnico completo", desc:"GeoTIFF / OBJ / LAS-LAZ (se applicabile)", price: 180 },
         { id:"fotogrammetria_addons3", label:"Quality report + nota tecnica", desc:"Metodo / limiti / riutilizzo", price: 350 }
       ]
     },
     {
       id: "rilievi",
       label: "Rilievi del territorio",
       desc: "Acquisizione dati e lettura preliminare del contesto territoriale.",
       packages: [
         { id:"rilievi_basic", label:"Rilievo area circoscritta", desc:"Documentazione essenziale e inquadramento rapido", price: 350 },
         { id:"rilievi_pro",   label:"Rilievo area estesa", desc:"Copertura più ampia e maggiore dettaglio di contesto", price: 550 },
         { id:"rilievi_tech",  label:"Rilievo “decisionale”", desc:"Lettura + inquadramento a supporto di valutazioni", price: 750 }
       ],
       addons: [
         { id:"rilievi_addons1", label:"Report fotografico strutturato", desc:"Indice + evidenze", price: 150 },
         { id:"rilievi_addons2", label:"Video di contesto", desc:"Riprese panoramiche e inquadramento area", price: 150 }
       ]
     },
     {
       id: "valorizzazione",
       label: "Valorizzazione del territorio",
       desc: "Restituzione visiva consapevole del territorio e delle sue relazioni spaziali.",
       packages: [
         { id:"valorizzazione_basic", label:"Valorizzazione area singola", desc:"Shoot curato (1 location)", price: 650 },
         { id:"valorizzazione_pro",   label:"Valorizzazione progetto", desc:"Più location / scene", price: 1200 },
         { id:"valorizzazione_tech",  label:"Campagna", desc:"Multi-uscite", price: 1900 }
       ],
       addons: [
         { id:"valorizzazione_addons1", label:"Selezione + color base", desc:"Set foto “pronto pubblicazione”", price: 180 },
         { id:"valorizzazione_addons2", label:"Video narrativo breve", desc:"30–60s", price: 390 }
       ]
     },
     {
       id: "eventi",
       label: "Eventi e storytelling tecnico",
       desc: "Documentazione professionale di eventi e attività tecniche con linguaggio sobrio e coerente.",
       packages: [
         { id:"eventi_basic", label:"Evento breve", desc:"1–2 ore", price: 450 },
         { id:"eventi_pro",   label:"Mezza giornata", desc:"Più location / scene", price: 850 },
         { id:"eventi_tech",  label:"Strutturato (narrazione + continuità)", desc:"Multi-uscite", price: 1250 }
       ],
       addons: [
         { id:"eventi_addons1", label:"Montaggio video breve", desc:"Reel / spot", price: 350 },
         { id:"eventi_addons2", label:"Consegna prioritaria 48h", desc:"Applicata al totale", percent: 25 }
       ]
     }
   ];

   
   // =========================================================
   // FORMATTAZIONE
   // =========================================================
   function formatEuro(n){
     var num = Number(n || 0);
     try{
       return num.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
     } catch (e){
       return (Math.round(num * 100) / 100).toFixed(2).replace(".", ",");
     }
   }
   function eur(n){ return "€ " + formatEuro(n); }

   function pad(n){ return String(n).padStart(2,"0"); }
   function toISO(d){ return d.getUTCFullYear()+"-"+pad(d.getUTCMonth()+1)+"-"+pad(d.getUTCDate()); }
   function fromISO(s){
     var p = s.split("-");
     return new Date(Date.UTC(+p[0], +p[1]-1, +p[2], 0,0,0));
   }
   function addDays(d,n){
     var x = new Date(d.getTime());
     x.setUTCDate(x.getUTCDate()+n);
     return x;
   }
   function formatMonth(dateLocal){
     var it = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
     return it[dateLocal.getMonth()] + " " + dateLocal.getFullYear();
   }
   function formatIT(iso){
     var p = iso.split("-");
     return p[2] + "/" + p[1] + "/" + p[0];
   }

   
   // =========================================================
   // DOM
   // =========================================================
   var grid = document.getElementById("dispGrid");
   var monthLabel = document.getElementById("dispMonth");
   var selLabel = document.getElementById("dispSelected");
   var statusBox = document.getElementById("dispStatus");
   var statusBox1 = document.getElementById("dispStatus1");

   var btnPrev = document.getElementById("dispPrev");
   var btnNext = document.getElementById("dispNext");
   var btnReset = document.getElementById("dispReset");
   var btnSend = document.getElementById("dispSend");
   var btnSend1 = document.getElementById("dispSend1");

   var inName  = document.getElementById("dispName");
   var inEmail = document.getElementById("dispEmail");
   var inPhone = document.getElementById("dispPhone");
   var inNotes = document.getElementById("dispNotes");

   var nameMsg  = document.getElementById("dispNameMsg");
   var emailMsg = document.getElementById("dispEmailMsg");
   var phoneMsg = document.getElementById("dispPhoneMsg");

   var stepServices = document.getElementById("dispStepServices");
   var elServices   = document.getElementById("dispServices");

   var packagesWrap = document.getElementById("dispPackagesWrap");
   var elPackages   = document.getElementById("dispPackages");

   var addonsWrap   = document.getElementById("dispAddonsWrap");
   var elAddons     = document.getElementById("dispAddons");

   var elTotal      = document.getElementById("dispTotal");
   var elBreakdown  = document.getElementById("dispBreakdown");

   if (!grid || !monthLabel || !selLabel || !stepServices) return;

   
   // =========================================================
   // STATE
   // =========================================================
   var view = new Date(); view.setDate(1);

   //  SOLO 1 DATA
   var selectedDate = null; // Date UTC
   var daysStatus   = {};   // "YYYY-MM-DD" -> pending|booked

// ===== Status cache + loading =====
   var isLoadingStatus = true;
   var LS_KEY_STATUS = "stratia_daysStatus_cache_v1";

   function loadStatusFromCache(){
     try{
       var raw = localStorage.getItem(LS_KEY_STATUS);
       if (!raw) return false;
       var parsed = JSON.parse(raw);
       if (!parsed || typeof parsed !== "object") return false;
       daysStatus = parsed;
       return true;
     } catch(e){
       return false;
     }
   }

   function saveStatusToCache(){
     try{
       localStorage.setItem(LS_KEY_STATUS, JSON.stringify(daysStatus || {}));
     } catch(e){}
   }

   var selectedServiceId = null;

   //  MULTI PACCHETTI
   var selectedPackageIds = {}; // pkgId -> true

   // add-on multi
   var selectedAddons = {}; // addonId -> true

   
   // =========================================================
   // UI helpers
   // =========================================================
   function setStatus(msg, kind){
     if (!statusBox) return;
     statusBox.textContent = msg || "";
     statusBox.className = "disp-status" + (kind ? (" disp-status--" + kind) : "");
   
   
   if (!statusBox1) return;
   statusBox1.textContent = msg || "";
   statusBox1.className = "disp-status" + (kind ? (" disp-status--" + kind) : "");
 
  }

   function selectionLabel(){
     if (!selectedDate) return "—";
     return formatIT(toISO(selectedDate));
   }

   function monthRangeUTC(dateLocal){
     var y = dateLocal.getFullYear();
     var m = dateLocal.getMonth();
     var first = new Date(Date.UTC(y,m,1,0,0,0));
     var last  = new Date(Date.UTC(y,m+1,0,0,0));
     return { first:first, last:last };
   }

   function localISODate(d){
     var y = d.getFullYear();
     var m = String(d.getMonth()+1).padStart(2,"0");
     var day = String(d.getDate()).padStart(2,"0");
     return y + "-" + m + "-" + day;
   }
   function isToday(d){
     return localISODate(d) === localISODate(new Date());
   }

   
   // =========================================================
   // VALIDAZIONE
   // =========================================================
   function setFieldState(input, msgEl, ok, msg){
     if (!input || !msgEl) return;
     input.classList.remove("is-bad","is-good");
     msgEl.classList.remove("is-bad","is-good");

     if (msg){
       msgEl.textContent = msg;
       msgEl.style.display = "";
     } else {
       msgEl.textContent = "";
       msgEl.style.display = "none";
     }

     if (ok === true){
       input.classList.add("is-good");
       msgEl.classList.add("is-good");
     } else if (ok === false){
       input.classList.add("is-bad");
       msgEl.classList.add("is-bad");
     }
   }

   function cleanSpaces(s){ return String(s||"").replace(/\s+/g," ").trim(); }

   function validateName(){
     var v = cleanSpaces(inName && inName.value);
     if (!v){ setFieldState(inName, nameMsg, false, "Inserisci nome e cognome."); return false; }
     if (v.length < 3 || v.length > 80){ setFieldState(inName, nameMsg, false, "Nome troppo corto/lungo."); return false; }
     var parts = v.split(" ").filter(Boolean);
     if (parts.length < 2){ setFieldState(inName, nameMsg, false, "Inserisci anche il cognome."); return false; }
     setFieldState(inName, nameMsg, true, "OK");
     return true;
   }

   function validateEmail(){
     var v = cleanSpaces(inEmail && inEmail.value).toLowerCase();
     var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
     if (!v){ setFieldState(inEmail, emailMsg, false, "Inserisci un’email."); return false; }
     if (!ok){ setFieldState(inEmail, emailMsg, false, "Email non valida."); return false; }
     setFieldState(inEmail, emailMsg, true, "OK");
     return true;
   }

   function normalizePhone(raw){
     var s = String(raw||"").trim();
     s = s.replace(/[()\-.\s]/g,"");
     if (s.startsWith("00")) s = "+" + s.slice(2);
     return s;
   }

   function validatePhone(){
     var v = normalizePhone(inPhone && inPhone.value);
     var ok = /^\+?\d{8,15}$/.test(v);
     if (!v){ setFieldState(inPhone, phoneMsg, false, "Inserisci un telefono."); return false; }
     if (!ok){ setFieldState(inPhone, phoneMsg, false, "Telefono non valido (usa +39... oppure solo cifre)."); return false; }
     inPhone.value = v;
     setFieldState(inPhone, phoneMsg, true, "OK");
     return true;
   }

   function validateAll(){
     var a = validateName();
     var b = validateEmail();
     var c = validatePhone();
     return a && b && c;
   }

   ;[inName, inEmail, inPhone].forEach(function(el){
     if (!el) return;
     el.addEventListener("blur", function(){
       if (el === inName) validateName();
       if (el === inEmail) validateEmail();
       if (el === inPhone) validatePhone();
       renderServices();
     });
     el.addEventListener("input", function(){
       renderServices();
     });
   });

   
   // =========================================================
   // STATUS / BLOCKED
   // =========================================================
   function statusClassForDay(iso){
     var st = daysStatus[iso];
     if (st === "booked") return "disp-booked";
     if (st === "pending") return "disp-pending";
     return "disp-avail";
   }
   function isBlocked(iso){
     return (daysStatus[iso] === "booked" || daysStatus[iso] === "pending");
   }

   
   // =========================================================
   // CALENDAR RENDER ( SOLO 1 DATA)
   // =========================================================
   function render(){
     monthLabel.textContent = formatMonth(view);
     selLabel.textContent = selectionLabel();

     var r = monthRangeUTC(view);
     var first = r.first;

     var day = first.getUTCDay();
     var mondayIndex = (day === 0) ? 6 : day - 1;
     var startGrid = addDays(first, -mondayIndex);

     grid.innerHTML = "";

     for (var i=0;i<42;i++){
       var d = addDays(startGrid, i);
       var iso = toISO(d);
       var inThisMonth = (d.getUTCMonth() === first.getUTCMonth());

       var cell = document.createElement("div");
       cell.className = "disp-day " + (inThisMonth ? "" : "disp-day--muted ");
       cell.className += " " + statusClassForDay(iso);
       if (isLoadingStatus) cell.className += " is-loading";


       if (isToday(d) && inThisMonth){
         cell.className += " disp-day--today";
       }

       cell.textContent = String(d.getUTCDate());

       var pill = document.createElement("div");
       pill.className = "disp-pill";
       cell.appendChild(pill);

       // selezione singola
       if (selectedDate && toISO(selectedDate) === iso){
         cell.className += " disp-selectedStart disp-inRange";
       }

       (function(dCopy, isoCopy, inMonthCopy){
         cell.addEventListener("click", function(){
           if (!inMonthCopy) return;

           if (isBlocked(isoCopy)){
             var st = daysStatus[isoCopy];
             if (st === "booked") setStatus("Questo giorno è già confermato (rosso).", "bad");
             else setStatus("Questo giorno ha già una richiesta in corso (arancione).", "bad");
             return;
           }

           // ✅ SOLO 1 DATA: click = set data
           selectedDate = dCopy;
           setStatus("Data selezionata. Compila il form e invia la richiesta.", "good");

           render();
         });
       })(d, iso, inThisMonth);

       grid.appendChild(cell);
     }
   }

   
   // =========================================================
   // LOAD STATUS
   // =========================================================
   function getMonthFromTo(){
     var r = monthRangeUTC(view);
     return { from: toISO(r.first), to: toISO(r.last) };
   }

   function loadStatus(){
	   var mt = getMonthFromTo();
	   var url = API_URL + "?action=status&from=" + encodeURIComponent(mt.from) + "&to=" + encodeURIComponent(mt.to);

	   isLoadingStatus = true;

	   return fetch(url, { cache: "no-store" })
	     .then(function(r){ return r.json(); })
	     .then(function(j){
	       if (!j || !j.ok) throw new Error((j && j.error) ? j.error : "Errore status");
	       daysStatus = j.days || {};
	       saveStatusToCache();
	       isLoadingStatus = false;
	     })
	     .catch(function(err){
	       console.warn(err);
	       isLoadingStatus = false;
	       setStatus("Errore nel caricare la disponibilità. Controlla API_URL / deploy Apps Script.", "bad");
	     });
	 }


   function refreshStatus(){
     loadStatus().then(function(){ render(); });
   }

   
   // =========================================================
   // SERVICES LOGIC
   // =========================================================
   function canShowServices(){
     return validateAll();
   }

   function getServiceById(id){
     for (var i=0;i<SERVICES.length;i++){
       if (SERVICES[i].id === id) return SERVICES[i];
     }
     return null;
   }

   function getSelectedPackages(service){
     var out = [];
     (service.packages || []).forEach(function(p){
       if (selectedPackageIds[p.id]) out.push(p);
     });
     return out;
   }

   function getSelectedAddons(service){
     var out = [];
     (service.addons || []).forEach(function(a){
       if (selectedAddons[a.id]) out.push(a);
     });
     return out;
   }

   function hideServicesUIAndClear(){
     selectedServiceId = null;
     selectedPackageIds = {};
     selectedAddons = {};

     stepServices.style.display = "none";
     stepServices.hidden = true;

     elServices.innerHTML = "";
     elPackages.innerHTML = "";
     elAddons.innerHTML = "";

     packagesWrap.style.display = "none";
     addonsWrap.style.display = "none";

     recalcTotal();
   }

   function renderServices(){
     var show = canShowServices();

     if (!show){
       hideServicesUIAndClear();
       return;
     }

     stepServices.hidden = false;
     stepServices.style.display = "";

     elServices.innerHTML = "";
     SERVICES.forEach(function(s){
       var opt = document.createElement("div");
       opt.className = "disp-opt" + (selectedServiceId === s.id ? " is-checked" : "");
       opt.innerHTML =
         '<div class="disp-opt__box" aria-hidden="true"></div>' +
         '<div class="disp-opt__meta">' +
           '<div class="disp-opt__title">'+ s.label +'</div>' +
           '<div class="disp-opt__desc">'+ (s.desc || "") +'</div>' +
         '</div>';

       opt.addEventListener("click", function(){
         if (selectedServiceId === s.id){
           selectedServiceId = null;
           selectedPackageIds = {};
           selectedAddons = {};
           packagesWrap.style.display = "none";
           addonsWrap.style.display = "none";
           elPackages.innerHTML = "";
           elAddons.innerHTML = "";
           recalcTotal();
           renderServices();
           return;
         }

         selectedServiceId = s.id;
         selectedPackageIds = {};
         selectedAddons = {};
         renderServices();
         renderPackages();
         renderAddons();
         recalcTotal();
       });

       elServices.appendChild(opt);
     });

     renderPackages();
     renderAddons();
     recalcTotal();
   }

   //  MULTI PACCHETTI: toggle multiplo
   function renderPackages(){
     var s = getServiceById(selectedServiceId);
     if (!s){
       packagesWrap.style.display = "none";
       elPackages.innerHTML = "";
       return;
     }

     packagesWrap.style.display = "";
     elPackages.innerHTML = "";

     (s.packages || []).forEach(function(p){
       var checked = !!selectedPackageIds[p.id];

       var opt = document.createElement("div");
       opt.className = "disp-opt" + (checked ? " is-checked" : "");
       opt.innerHTML =
         '<div class="disp-opt__box" aria-hidden="true"></div>' +
         '<div class="disp-opt__meta">' +
           '<div class="disp-opt__title">'+ p.label + ' <span style="color:#0e7490;font-weight:900;">(' + eur(p.price) + ')</span></div>' +
           '<div class="disp-opt__desc">'+ (p.desc || "") +'</div>' +
         '</div>';

       opt.addEventListener("click", function(){
         selectedPackageIds[p.id] = !selectedPackageIds[p.id];

         // se tolgo tutti i pacchetti -> reset add-on
         var s2 = getServiceById(selectedServiceId);
         if (s2 && getSelectedPackages(s2).length === 0){
           selectedAddons = {};
           addonsWrap.style.display = "none";
           elAddons.innerHTML = "";
         }

         renderPackages();
         renderAddons();
         recalcTotal();
       });

       elPackages.appendChild(opt);
     });
   }

   function renderAddons(){
     var s = getServiceById(selectedServiceId);
     if (!s){
       addonsWrap.style.display = "none";
       elAddons.innerHTML = "";
       return;
     }

     // add-on visibili solo se ho almeno 1 pacchetto selezionato
     if (getSelectedPackages(s).length === 0){
       addonsWrap.style.display = "none";
       elAddons.innerHTML = "";
       return;
     }

     addonsWrap.style.display = "";
     elAddons.innerHTML = "";

     (s.addons || []).forEach(function(a){
       var checked = !!selectedAddons[a.id];

       var priceTxt = "";
       if (typeof a.percent === "number"){
         priceTxt = "(+" + a.percent + "%)";
       } else {
         priceTxt = "(+" + eur(a.price || 0) + ")";
       }

       var opt = document.createElement("div");
       opt.className = "disp-opt" + (checked ? " is-checked" : "");
       opt.innerHTML =
         '<div class="disp-opt__box" aria-hidden="true"></div>' +
         '<div class="disp-opt__meta">' +
           '<div class="disp-opt__title">'+ a.label + ' <span style="color:#0e7490;font-weight:900;">' + priceTxt + '</span></div>' +
           '<div class="disp-opt__desc">'+ (a.desc || "") +'</div>' +
         '</div>';

       opt.addEventListener("click", function(){
         selectedAddons[a.id] = !selectedAddons[a.id];
         renderAddons();
         recalcTotal();
       });

       elAddons.appendChild(opt);
     });
   }

   
   // =========================================================
   // TOTAL (multi pacchetti + addon fissi + addon %)
   // =========================================================
   function computeTotal(baseSum, selectedAddonsArr){
     var total = Number(baseSum || 0);

     // add-on fissi
     selectedAddonsArr.forEach(function(a){
       if (typeof a.price === "number") total += a.price;
     });

     // add-on percentuali (sul totale corrente)
     selectedAddonsArr.forEach(function(a){
       if (typeof a.percent === "number"){
         total += total * (a.percent / 100);
       }
     });

     return total;
   }

   function recalcTotal(){
     if (!elTotal || !elBreakdown) return;

     var s = getServiceById(selectedServiceId);
     if (!s){
       elTotal.textContent = "€ 0,00";
       elBreakdown.textContent = "Seleziona un servizio.";
       return;
     }

     var pkgs = getSelectedPackages(s);
     if (pkgs.length === 0){
       elTotal.textContent = "€ 0,00";
       elBreakdown.textContent = "Seleziona almeno un pacchetto per calcolare il totale.";
       return;
     }

     var baseSum = pkgs.reduce(function(sum,p){ return sum + Number(p.price || 0); }, 0);
     var adds = getSelectedAddons(s);
     var total = computeTotal(baseSum, adds);

     elTotal.textContent = eur(total);

     var parts = [s.label + " • Base pacchetti: " + eur(baseSum)];
     pkgs.forEach(function(p){
       parts.push(p.label + " (" + eur(p.price) + ")");
     });
     adds.forEach(function(a){
       if (typeof a.percent === "number") parts.push(a.label + " (+" + a.percent + "%)");
       else parts.push(a.label + " (+" + eur(a.price || 0) + ")");
     });

     elBreakdown.textContent = parts.join(" • ");
   }

   function sendRequest(){
	   if (!selectedDate){
	     setStatus("La data è vuota. Seleziona un giorno.", "bad");
	     return;
	   }

	   var dayIso = toISO(selectedDate);

	   if (isBlocked(dayIso)){
	     setStatus("Questo giorno non è disponibile (rosso/arancione).", "bad");
	     return;
	   }

	   if (!validateAll()){
	     setStatus("Controlla Nome, Email e Telefono (campi evidenziati).", "bad");
	     renderServices();
	     return;
	   }

	   if (!selectedServiceId){
	     setStatus("Seleziona un servizio prima di inviare la richiesta.", "bad");
	     return;
	   }

	   var svc = getServiceById(selectedServiceId);
	   if (!svc){
	     setStatus("Errore: servizio non trovato.", "bad");
	     return;
	   }

	   var pkgs = getSelectedPackages(svc);
	   if (!pkgs || !pkgs.length){
	     setStatus("Seleziona almeno un pacchetto prima di inviare la richiesta.", "bad");
	     return;
	   }

	   var adds = getSelectedAddons(svc) || [];

	   // ===== Totali =====
	   var basePackages = pkgs.reduce(function(sum,p){ return sum + Number(p.price || 0); }, 0);
	   var totalAmount  = computeTotal(basePackages, adds);

	  
	   var packagesJson = JSON.stringify(pkgs.map(function(p){
	     return { id:p.id, label:p.label, price:Number(p.price||0) };
	   }));

	   var extrasJson = JSON.stringify(adds.map(function(a){
	     var obj = { id:a.id, label:a.label };
	     if (typeof a.percent === "number") obj.percent = Number(a.percent);
	     else obj.price = Number(a.price||0);
	     return obj;
	   }));

	   // ===== Campi testo (compatibilità / debug) =====
	   var packageIds    = pkgs.map(function(p){ return p.id; }).join(",");
	   var packageLabels = pkgs.map(function(p){ return p.label; }).join(", ");
	   var packagePrices = pkgs.map(function(p){ return String(Number(p.price||0)); }).join(",");

	   var packagesDetail = pkgs.map(function(p){
	     return p.label + " (" + eur(p.price) + ")";
	   }).join(", ");

	   var extrasSimple = adds.map(function(a){
	     if (typeof a.percent === "number") return a.label + " (+" + a.percent + "%)";
	     return a.label;
	   }).join(", ");

	   var extrasDetail = adds.map(function(a){
	     if (typeof a.percent === "number") return a.label + " (+" + a.percent + "%)";
	     return a.label + " (+" + eur(a.price || 0) + ")";
	   }).join(", ");

	   setStatus("Invio richiesta in corso…", "");

	   var body = new URLSearchParams();
	   body.set("start_date", dayIso);
	   body.set("end_date", dayIso); // singola data

	   body.set("full_name", cleanSpaces(inName.value));
	   body.set("email", cleanSpaces(inEmail.value).toLowerCase());
	   body.set("phone", normalizePhone(inPhone.value));
	   body.set("notes", (inNotes && inNotes.value || "").trim());

	   body.set("service_id", selectedServiceId);
	   body.set("service_label", svc.label || "");

	   //  LEGACY (se in qualche template vecchio li stai ancora usando)
	   body.set("package_label", packagesDetail);     
	   body.set("package_price", String(basePackages));

	   body.set("package_ids", packageIds);
	   body.set("package_labels", packageLabels);
	   body.set("package_prices", packagePrices);
	   body.set("packages_detail", packagesDetail);
	   body.set("packages_base_total", String(basePackages)); 

	   // JSON 
	   body.set("packages_json", packagesJson);
	   body.set("extras_json", extrasJson);

	   //  Add-on testo
	   body.set("extras", extrasSimple);
	   body.set("extras_detail", extrasDetail);

	   //  Totale stimato
	   body.set("total_amount", String(totalAmount));

	   fetch(API_URL + "?action=request", { method:"POST", body: body })
	     .then(function(r){ return r.json(); })
	     .then(function(j){
	       if (!j || !j.ok) throw new Error((j && j.error) ? j.error : "Errore invio");
	       setStatus("Richiesta inviata ✅ (ora è in attesa di risposta).", "good");
	       return loadStatus().then(function(){ render(); });
	     })
	     .catch(function(err){
	       console.warn(err);
	       setStatus("Errore invio richiesta: " + err.message, "bad");
	     });
	 }


   // =========================================================
   // RESET
   // =========================================================
   function hardReset(){
     view = new Date();
     view.setDate(1);

     selectedDate = null;

     if (inName)  inName.value = "";
     if (inEmail) inEmail.value = "";
     if (inPhone) inPhone.value = "";
     if (inNotes) inNotes.value = "";

     selectedServiceId = null;
     selectedPackageIds = {};
     selectedAddons = {};

     hideServicesUIAndClear();

     setStatus("", "");
     render();
     refreshStatus();
     validateAll();
     renderServices();
   }
   
   
   // =========================================================
   // NAV + BUTTONS
   // =========================================================
   btnPrev && btnPrev.addEventListener("click", function(){
     view.setMonth(view.getMonth()-1);
     render();
     refreshStatus();
   });

   btnNext && btnNext.addEventListener("click", function(){
     view.setMonth(view.getMonth()+1);
     render();
     refreshStatus();
   });

   btnReset && btnReset.addEventListener("click", hardReset);
   btnSend && btnSend.addEventListener("click", sendRequest);
   btnSend1 && btnSend1.addEventListener("click", sendRequest);

   
   // =========================================================
   // INIT
   // =========================================================
   hideServicesUIAndClear();
   validateAll();
   renderServices();

   // 1) primo paint: se ho cache coloro subito, altrimenti mostro loading
   if (loadStatusFromCache()){
     isLoadingStatus = false; // ho dati, niente loading
     render();
   } else {
     isLoadingStatus = true;  // niente cache: loading grigio
     render();
   }

   // 2) refresh reale dal server e repaint
   loadStatus().then(function(){
     render();
   });


 })();
