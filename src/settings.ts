import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

export interface HeinibalPluginSettings {
	mySetting: string;
	defaultCanvasFolder?: string;
}

export const DEFAULT_SETTINGS: HeinibalPluginSettings = {
	mySetting: "default",
	defaultCanvasFolder: "",
};

export class HeinibalSettingTab extends PluginSettingTab {
	plugin: Plugin & { settings: HeinibalPluginSettings; saveSettings: () => Promise<void> };

	constructor(app: App, plugin: Plugin & { settings: HeinibalPluginSettings; saveSettings: () => Promise<void> }) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Default canvas folder")
			.setDesc("Folder for new .hcanvas files (leave empty for vault root)")
			.addText((text) =>
				text
					.setPlaceholder("For example: canvases")
					.setValue(this.plugin.settings.defaultCanvasFolder ?? "")
					.onChange(async (value) => {
						this.plugin.settings.defaultCanvasFolder = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
