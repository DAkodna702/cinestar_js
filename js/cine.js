const getcine = async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const data = await fetch(`http://localhost/cinestar_sweb_php/cines/${id}`);
  if (data.status == 200) {
    let cine = await data.json();
      cine = cine.data;
      let hmtltarifas = ``;
      let hmtlpeliculas = ``;
      cine.tarifas.forEach(tarifa => {
          let precioString = tarifa.Precio
          let precioNumber = parseFloat(precioString.replace("S/.", "").trim())
          hmtltarifas += `
          	<div class="fila">
							<div class="celda-titulo">${tarifa.DiasSemana}</div>
							<div class="celda"> S/ ${precioNumber}.00</div>
						</div>
        `
      });

       cine.peliculas.forEach((peliculass) => {
         hmtlpeliculas += `
          <div class="fila impar">
			<div class="celda-titulo">${peliculass.Titulo}</div>
			<div class="celda">${peliculass.Horarios}</div>
		  </div>
          `;
       });

    let html = `
       <h2>${cine.RazonSocial}</h2>
			<div class="cine-info">
				<div class="cine-info datos">
					<p>${cine.Direccion}</p>
					<p>${cine.Telefonos}</p>
					<br />
					<div class="tabla">
                    ${hmtltarifas}
                    </div>
					<div class="aviso">
						<p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de
							S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el
							aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña,
							San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
					</div>
					<img  src="img/cine/1.2.jpg" />
					<br /><br />
					<h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br />
					<div class="cine-info peliculas">
						<div class="tabla">
							<div class="fila">
								<div class="celda-cabecera">Películas</div>
								<div class="celda-cabecera">Horarios</div>
							</div>
                            ${hmtlpeliculas}

						</div>
					</div>
				</br>
					<div>
		                <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br />
			             Horario de atención de juegos es de 12:00 m hasta las 10:30 pm.
			             <br /><br />
			             Visitános y diviértete con nosotros.
			             <br /><br />
			             <b>CINESTAR</b>, siempre pensando en tí.
		                 </span>
						 <img style="margin-top: -140px;" src="img/cine/1.3.jpg" alt="Imagen del cine" />
	                </div>
			    </div>
			</div>
        `;
    document.getElementById("contenido-interno").innerHTML = html;
  }
};

getcine();
