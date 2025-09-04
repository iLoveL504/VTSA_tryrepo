 <div className="Content CreateProject">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Example of a text input with validation */}
        <div>
          <label htmlFor="liftName">Lift Name</label>
          <input
            type="text"
            id="liftName"
            name="liftName"
            value={values.liftName}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.liftName && <p className="error">{errors.liftName}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={values.capacity}
            onChange={handleNumberInputChange}
            onBlur={handleBlur}
          />
          {errors.capacity && <p className="error">{errors.capacity}</p>}
        </div>

        <div>
          <label htmlFor="drive">Drive</label>
          <input
            type="text"
            id="drive"
            name="drive"
            value={values.drive}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="doorOperator">Door Operator</label>
          <input
            type="text"
            id="doorOperator"
            name="doorOperator"
            value={values.doorOperator}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="speed">Speed</label>
          <input
            type="number"
            id="speed"
            name="speed"
            value={values.speed}
            onChange={handleNumberInputChange}
            onBlur={handleBlur}
          />
          {errors.speed && <p className="error">{errors.speed}</p>}
        </div>

        {/* Continue this same pattern for all remaining fields */}
        <div>
          <label htmlFor="control">Control</label>
          <input
            type="text"
            id="control"
            name="control"
            value={values.control}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="stops">Stops</label>
          <input
            type="number"
            id="stops"
            name="stops"
            value={values.stops}
            onChange={handleNumberInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="servingFloor">Serving Floor</label>
          <input
            type="text"
            id="servingFloor"
            name="servingFloor"
            value={values.servingFloor}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="travel">Travel</label>
          <input
            type="number"
            id="travel"
            name="travel"
            value={values.travel}
            onChange={handleNumberInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="powerSupply">Power Supply</label>
          <input
            type="text"
            id="powerSupply"
            name="powerSupply"
            value={values.powerSupply}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="shaft">Shaft</label>
          <input
            type="text"
            id="shaft"
            name="shaft"
            value={values.shaft}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="shaftSize">Shaft Size</label>
          <input
            type="text"
            id="shaftSize"
            name="shaftSize"
            value={values.shaftSize}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="carSize">Car Size</label>
          <input
            type="text"
            id="carSize"
            name="carSize"
            value={values.carSize}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="doorSize">Door Size</label>
          <input
            type="text"
            id="doorSize"
            name="doorSize"
            value={values.doorSize}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="overheadHeight">Overhead Height</label>
          <input
            type="number"
            id="overheadHeight"
            name="overheadHeight"
            value={values.overheadHeight}
            onChange={handleNumberInputChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label htmlFor="pitDepth">Pit Depth</label>
          <input
            type="number"
            id="pitDepth"
            name="pitDepth"
            value={values.pitDepth}
            onChange={handleNumberInputChange}
            onBlur={handleBlur}
          />
        </div>

        <button type="submit">Create Project</button>
      </form>
    </div>