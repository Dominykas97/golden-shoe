export function SmallShoe({ shoeData }) {
    return (
        <div className="SmallShoe" id={shoeData.id} style={
            {
                border: '2px solid gold'
            }
        }>

            <p>{shoeData.name}</p>
            <p>{shoeData.price}</p>
        </div>
    );
}