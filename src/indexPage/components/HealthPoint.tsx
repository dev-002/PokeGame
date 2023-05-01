import "../styles/Health.css"

interface HealthProps {
    healthPoint: number,
    Damage: React.Dispatch<React.SetStateAction<void>>,
    updateApi: boolean,
    setUpdateApi: React.Dispatch<React.SetStateAction<boolean>>,
    healthUpdate: boolean,
    sethealthUpdate: React.Dispatch<React.SetStateAction<boolean>>
}
function HealthPoint({ Damage, healthPoint, updateApi, setUpdateApi, healthUpdate, sethealthUpdate }: HealthProps) {


    function handleProceed() {
        if (!healthUpdate) {
            Damage();
            sethealthUpdate(true);
        }
    }

    setTimeout(() => {
        if (updateApi) {
            handleProceed();
            setUpdateApi(false);
        }
    }, 2000)

    return (
        <>
            <div className="health-bar">
                <h2>Health:</h2> {healthPoint}
                <div id="bar">
                    <div style={{ width: `${healthPoint<1000?(healthPoint / 10):100}%`}}></div>
                </div>
            </div>
        </>
    )
}

export default HealthPoint;