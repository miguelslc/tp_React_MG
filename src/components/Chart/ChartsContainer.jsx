import { Grid } from "@mui/material";
import SkinsCharts from "./SkinsCharts";
import AgentsCharts from "./AgentsCharts";

export default function ChartsContainer() {
    return (
        <>
            <Grid container>
                <Grid size={6}>
                    <SkinsCharts />
                </Grid>
                <Grid size={6}>
                    <AgentsCharts />
                </Grid>
            </Grid>
        </>
    )
}