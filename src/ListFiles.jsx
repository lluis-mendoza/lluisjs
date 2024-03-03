const FILES = process.env.FILES.replace("[", "").replace("]", "").split(",");

const ListFiles = () => {

    return (
        <ul>
            {
                FILES.map(file => (
                    <li key={file}>
                        {file}
                    </li>
                ))
            }
        </ul>
    )
}

export default ListFiles