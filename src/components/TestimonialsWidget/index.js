import React from 'react'

export default function TestimonialsWidget(props) {
  const [testimonial, setTestimonial] = React.useState('');
  const [userReceiver, setUserReceiver] = React.useState('');
  const maxLength = 1000
  return (
    <>
      <form onSubmit={async (e) => {
        e.preventDefault();

        const dadosDoForm = new FormData(e.target);

        const depoimento = {
          testimonial: dadosDoForm.get('testimonial'),
          creatorSlug: props.githubUser,
          userReceiver: dadosDoForm.get('userReceiver')
        }

        const testimonialRes = await fetch('/api/depoimentos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(depoimento)
        });
        if (testimonialRes.ok) {
          await testimonialRes.json();
          alert("Depoimento enviado com sucesso")
          e.target.reset();
        }
      }}>
        <div>
          <input
            required
            className="scrapTextArea"
            placeholder="usuário"
            name="userReceiver"
            value={userReceiver}
            onChange={(e) => {
              setUserReceiver(e.target.value)
            }}
            aria-label="usuário">
          </input>
          <textarea
            rows="20"
            required
            className="scrapTextArea"
            placeholder="Escreva seu depoimento"
            name="testimonial"
            value={testimonial}
            maxLength={maxLength}
            onChange={(e) => {
              setTestimonial(e.target.value)
            }}
            aria-label="Escreva um recado">
          </textarea>
        </div>
        {testimonial.length === maxLength
          ? (<p style={{ color: 'red', marginBottom: '20px', fontWeight: 'bold' }}>
            Limite de {maxLength} caracteres atingido!
          </p>)
          : ''
        }

        <button type="submit" disabled={testimonial.length === 0 || userReceiver.length === 0}>
          Enviar depoimento
        </button>
      </form>
    </>
  )
}
