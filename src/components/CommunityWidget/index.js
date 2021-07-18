export default function CommunityWidget(props) {
  return (
    <>
      <form onSubmit={async (e) => {
        e.preventDefault();

        const dadosDoForm = new FormData(e.target);

        const comunidade = {
          title: dadosDoForm.get('title'),
          image: dadosDoForm.get('image'),
          url: dadosDoForm.get('url'),
          creatorSlug: props.githubUser
        }

        const communityRes = await fetch('/api/comunidades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(comunidade)
        });
        if (communityRes.ok) {
          const record = await communityRes.json();

          const comunidadesAtualizadas = [record, ...props.comunidades];
          props.onSubmit(comunidadesAtualizadas);
          console.log(e)
          e.target.reset();
        }
      }}>
        <div>
          <input
            required
            placeholder="Qual vai ser o nome da sua comunidade?"
            name="title"
            aria-label="Qual vai ser o nome da sua comunidade?" />
        </div>
        <div>
          <input
            required
            placeholder="Coloque uma URL para usarmos de capa"
            name="image"
            defaultValue={"https://picsum.photos/300/300?random=1"}
            onChange={() => { }}
            aria-label="Coloque uma URL para usarmos de capa" />
        </div>
        <div>
          <input
            required
            placeholder="Coloque a URL da comunidade"
            name="url"
            aria-label="Coloque a URL da comunidade" />
        </div>

        <button type="submit">
          Criar comunidade
        </button>
      </form>
    </>
  )
}