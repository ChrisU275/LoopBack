// For posting new listings

export default function CreateListing() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a Listing</h2>
      <form>
        <input placeholder="Title" /><br/>
        <input placeholder="Type (Donate / Exchange / Repair)" /><br/>
        <input placeholder="Community" /><br/>
        <textarea placeholder="Description"></textarea><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}