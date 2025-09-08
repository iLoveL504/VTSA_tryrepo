import { useEffect, useState } from "react"
import useAxiosFetch from "../hooks/useAxiosFetch"
import { useStoreState } from "easy-peasy"

const taskMap = {
    unloading_equipment_date: 'Unloading of elevator equipments',
    scaffolding_date: 'Scaffolding Installation',
    hauling_date: 'Hauling Works',
    template_date: 'Template Setting',
    boring_holes_date: 'Marking and Boring of Holes',
    rail_bracket_date: 'Rail Bracket Installation',
    guide_rail_car_date: 'Guide Rail Setting - Main/Car',
    guide_rail_cwt_date: 'Guide Rail Setting - Counterweight (CWT)',
    guide_rail_gauge_date: 'Guide Rail Setting - Gauging',
    door_sills_date: 'Landing Door Assembly - Sills and Supports',
    door_jamb_date: 'Landing Door Assembly - Jamb and Supports',
    door_frame_date: 'Landing Door Assembly - Frame and Doors',
    machine_traction_date: 'M/R Equipment Setting - Traction Machine',
    machine_beams_date: 'M/R Equipment Setting - Support Beams',
    machine_governor_date: 'M/R Equipment Setting - Governor',
    control_panel_date: 'Installation of Control Panel',
    car_accessories_date: 'Car Assembly - All Accessories',
    car_wiring_date: 'Car Assembly - Car Piping Wiring',
    travelling_cable_date: 'Travelling Cable Layout',
    counterweight_date: 'Counterweight Assembly',
    ropes_hoisting_date: 'Laying out of Ropes - Hoisting',
    ropes_governor_date: 'Laying out of Ropes - Governor',
    ropes_compensating_date: 'Laying out of Ropes - Compensating',
    wiring_mr_date: 'Wiring - Machine Room',
    wiring_hoistway_date: 'Wiring - Hoistway',
    pit_ladder_date: 'Installation of Pit Ladder / Hoistway Lighting',
    initial_test_date: 'Initial testing',
    slow_speed_date: 'Slow speed',
    high_speed_date: 'High speed and Mechanical Adjustment',
    load_test_date: 'Load Test',
    final_adjust_date: 'Final Adjust',
    features_test_date: 'Features Test / Correction of Defects',
    handover_date: 'Final Cleaning / Hand over'
};

const reverseTaskMap = {
    'Unloading of elevator equipments': 'unloading_equipment_date',
    'Scaffolding Installation': 'scaffolding_date',
    'Hauling Works': 'hauling_date',
    'Template Setting': 'template_date',
    'Marking and Boring of Holes': 'boring_holes_date',
    'Rail Bracket Installation': 'rail_bracket_date',
    'Guide Rail Setting - Main/Car': 'guide_rail_car_date',
    'Guide Rail Setting - Counterweight (CWT)': 'guide_rail_cwt_date',
    'Guide Rail Setting - Gauging': 'guide_rail_gauge_date',
    'Landing Door Assembly - Sills and Supports': 'door_sills_date',
    'Landing Door Assembly - Jamb and Supports': 'door_jamb_date',
    'Landing Door Assembly - Frame and Doors': 'door_frame_date',
    'M/R Equipment Setting - Traction Machine': 'machine_traction_date',
    'M/R Equipment Setting - Support Beams': 'machine_beams_date',
    'M/R Equipment Setting - Governor': 'machine_governor_date',
    'Installation of Control Panel': 'control_panel_date',
    'Car Assembly - All Accessories': 'car_accessories_date',
    'Car Assembly - Car Piping Wiring': 'car_wiring_date',
    'Travelling Cable Layout': 'travelling_cable_date',
    'Counterweight Assembly': 'counterweight_date',
    'Laying out of Ropes - Hoisting': 'ropes_hoisting_date',
    'Laying out of Ropes - Governor': 'ropes_governor_date',
    'Laying out of Ropes - Compensating': 'ropes_compensating_date',
    'Wiring - Machine Room': 'wiring_mr_date',
    'Wiring - Hoistway': 'wiring_hoistway_date',
    'Installation of Pit Ladder / Hoistway Lighting': 'pit_ladder_date',
    'Initial testing': 'initial_test_date',
    'Slow speed': 'slow_speed_date',
    'High speed and Mechanical Adjustment': 'high_speed_date',
    'Load Test': 'load_test_date',
    'Final Adjust': 'final_adjust_date',
    'Features Test / Correction of Defects': 'features_test_date',
    'Final Cleaning / Hand over': 'handover_date'
};

const usefindProjectTask = (dates, id) => {
    const dateNow = useStoreState(state => state.date)

    const [tasksInfo, setTasksInfo] = useState(null)
    const [tasksFetchError, setTasksFetchError] = useState(null)
    const [tasksIsLoading, setTasksIsLoading] = useState(true)
    const [currentTask, setCurrentTask] = useState({})

    const [fetchedData, fetchError, isLoading] = useAxiosFetch(`http://localhost:4000/projects/schedule/${id}`)

    useEffect(() => {
        if (!isLoading) {
            setTasksInfo(fetchedData)
            setTasksFetchError(fetchError)
            setTasksIsLoading(false)
            const d2 = new Date(dateNow)
 
            console.log(fetchedData)

            const dateFields = Object.entries(fetchedData[0])
            .filter(([key]) => key.endsWith("date")) 
            .map(([key, value]) => ({ key, value: new Date(value) }));
            console.log(dateFields)
            for (let i = 0; i < dateFields.length; i++) {
                if (dateFields[i].value < d2) {
                    if (i + 1 < dateFields.length && dateFields[i + 1].value > d2) {
                    console.log(`Current task is ${dateFields[i].key}`);
                    setCurrentTask({
                        name: taskMap[dateFields[i].key],
                        date: dateFields[i].value.toISOString().split("T")[0]
                    });
                    return;
                    }
                }
            }
        }
    }, [isLoading, fetchedData, fetchError])

    return [currentTask, tasksFetchError, tasksIsLoading]
}

export default usefindProjectTask