'use server'

const action = async (_: { success: boolean; message: string } | null, formData: FormData) => {
  try {
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      pageUrl: formData.get('pageUrl'),
    }
    const res = await fetch(process.env.CONTACT_FORM_ACTION_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    let data
    try {
      data = await res.json()
    } catch (err) {
      console.error('Non-JSON response:', err) // 👈 will print the HTML error page
      return { success: false, message: 'Server did not return JSON — check API logs' }
    }

    return data
  } catch (error) {
    console.error('Contact form submission error:', error)
    return { success: false, message: 'Oops! There was a problem submitting your form' }
  }
}

export default action
