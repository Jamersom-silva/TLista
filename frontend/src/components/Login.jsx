import React, { useState } from 'react'
import API, { setToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await API.post('/auth/login', { email, password })
      const { token } = res.data
      localStorage.setItem('todo_token', token)
      setToken(token)
      nav('/')
    }catch(err){
      alert(err.response?.data?.error || 'Erro ao logar')
    }
  }

  return (
    <div style={{maxWidth:400, margin:'2rem auto', background:'#fff', padding:20, borderRadius:8}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/>
        <input placeholder='Senha' type='password' value={password} onChange={e=>setPassword(e.target.value)} /><br/><br/>
        <button type='submit'>Entrar</button>
      </form>
    </div>
  )
}
