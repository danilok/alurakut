import React from 'react';

export default function ScrapsWidget(props) {
  const [scrap, setScrap] = React.useState('');

  return (
    <>
      <form onSubmit={async (e) => {
        e.preventDefault();

        const dadosDoForm = new FormData(e.target);

        const recado = {
          scrap: dadosDoForm.get('scrap'),
          creatorSlug: props.loggedUser,
          userReceiver: props.githubUser
        }

        const scrapRes = await fetch('/api/recados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recado)
        });
        if (scrapRes.ok) {
          const record = await scrapRes.json();

          const recadosAtualizados = [record, ...props.recados];
          props.onSubmit(recadosAtualizados);
          e.target.reset();
        }
      }}>
        <div>
          <textarea
            rows="3"
            required
            className="scrapTextArea"
            placeholder="Escreva um recado"
            name="scrap"
            value={scrap}
            maxLength="200"
            onChange={(e) => {
              setScrap(e.target.value)
            }}
            aria-label="Escreva um recado">
          </textarea>
        </div>
        {scrap.length === 200 ? <p style={{ color: 'red', marginBottom: '20px' }}>Limite de 200 caracteres atingido</p> : ''}

        <button type="submit" disabled={scrap.length === 0}>
          Enviar recado
        </button>
      </form>

      <h2 className="scrapTitle">Recados ({props.recados.length})</h2>
      <ul className="scrapList">
        {props.recados.map((recado) => {
          return (
            <li key={recado.id}>
              <a className="scrapItem">
                <img src={`https://github.com/${recado.creatorSlug}.png`} className="scrapImg" />
                <span className="scrapMessage">{recado.scrap}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}