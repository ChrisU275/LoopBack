import { useState } from "react";
import { addListing } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreateListing(){
  const nav = useNavigate();
  const [form,setForm] = useState({
    title:'', category:'Electronics', type:'donate',
    description:'', community:'Calgary', image:''
  });

  function update(k,v){ setForm(f=>({...f,[k]:v})) }

  async function submit(e){
    e.preventDefault();
    await addListing(form);
    nav('/marketplace');
  }

  return (
    <div className="container">
      <h1>Create listing</h1>
      <form className="card" onSubmit={submit} style={{display:'grid',gap:12}}>
        <input placeholder="Title" value={form.title} onChange={e=>update('title',e.target.value)} />
        <select value={form.category} onChange={e=>update('category',e.target.value)}>
          {['Electronics','Furniture','Clothing','Books','Other'].map(c=><option key={c}>{c}</option>)}
        </select>
        <select value={form.type} onChange={e=>update('type',e.target.value)}>
          <option value="donate">Donate</option>
          <option value="trade">Trade</option>
          <option value="repair">Repair</option>
        </select>
        <textarea rows={5} placeholder="Description" value={form.description} onChange={e=>update('description',e.target.value)} />
        <input placeholder="Image URL (for now)" value={form.image} onChange={e=>update('image',e.target.value)} />
        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}
